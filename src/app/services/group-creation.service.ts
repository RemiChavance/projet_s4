import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Group } from '../models/group.model';

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
                        // Create new group
                        firebase.database().ref('/group/nextGroupId').set(nextGroupId + 1);
                        firebase.database().ref('/group/' + newGroup.idGroup).set(newGroup).then(
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
                firebase.database().ref('/group/nextGroupId')
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
