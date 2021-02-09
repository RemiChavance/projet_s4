import { Injectable } from "@angular/core";
import { rejects } from "assert";
import * as firebase from 'firebase';
import { Groupe } from "../models/groupe.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class GroupeService {
  
    constructor() { }

    createNewGroupe(nom: string, admin: User) {
        return new Promise<void>(
            (resolve, reject) => {
                let newGroup: Groupe = new Groupe(nom, admin);
                this.getNextId().then( // Get next Id to assign it to the new group
                    (data) => {
                        newGroup.idGroupe = data;
                        newGroup.demandes = [];
                        newGroup.stats = [];
                        newGroup.recettes = [];        
                        // Create new group                
                        firebase.default.database().ref('/group/' + newGroup.idGroupe).set(newGroup).then(
                            () => {
                                this.updateNextGroupId();
                                resolve();
                            }
                        );
                    }
                )
                resolve();
            }
        );
    }


    /**
     * Update nextGroupId in database by adding 1 to it
     */
    updateNextGroupId() {
        this.getNextId().then(
            (data) => {
                firebase.default.database().ref('/group/nextGroupId').set(data + 1);
            }
        )
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
