import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Group } from "../models/group.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class GroupCreationService {
  
    constructor() { }

    createNewGroupe(name: string, admin: User) {
        return new Promise<number>(
            (resolve, reject) => {
                let newGroup: Group = new Group(name, admin);
                this.getNextId().then( // Get next Id to assign it to the new group
                    (data) => {
                        newGroup.idGroup = data;
                        newGroup.requests = [];
                        newGroup.stats = [];
                        newGroup.recipes = [];        
                        // Create new group
                        firebase.default.database().ref('/group/nextGroupId').set(data + 1);           
                        firebase.default.database().ref('/group/' + newGroup.idGroup).set(newGroup).then(
                            () => { 
                                resolve(newGroup.idGroup);
                            }
                        );
                        
                    }, (error) => {
                        reject(error);
                    }
                )
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
                )
            } 
        );
    }
}
