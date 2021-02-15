import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';

import { Recipe } from '../models/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class GroupCreationService {

    constructor() { }

    createNewGroupe(name: string, adminId: string) {
        return new Promise<number>(
            (resolve, reject) => {
                const newGroup: Group = new Group(name, adminId);
                this.getNextId().then( // Get next Id to assign it to the new group
                    (nextGroupId) => {
                        newGroup.idGroup = nextGroupId;
                        newGroup.requests = [];
                        newGroup.stats = [];
                        newGroup.recipes = [];
                        newGroup.recipes.push(new Recipe(0, 'Gateau', 'Gateau trop bon', 'authorId', [], []));
                        // Create new group
                        firebase.default.database().ref('/group/nextGroupId').set(nextGroupId + 1);
                        firebase.default.database().ref('/group/' + newGroup.idGroup).set(newGroup).then(
                            () => {
                                resolve(newGroup.idGroup);
                            }
                        );

                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    /**
     * Return next available group id
     */
    getNextId() {
        return new Promise<number>(
            (resolve, reject) => {
                firebase.default.database().ref('/group/nextGroupId')
                    .once('value')
                    .then(
                    (data) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }
}
