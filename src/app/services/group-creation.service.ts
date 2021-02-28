import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Group } from '../models/group.model';

@Injectable({
    providedIn: 'root'
})
export class GroupCreationService {

    constructor() { }

    createNewGroupe(name: string, adminId: string) {
        return new Promise<string>(
            (resolve, reject) => {
                const newGroup: Group = new Group(name, adminId);
                newGroup.requests = [];
                newGroup.stats = [];

                const newGroupRef = firebase.database().ref('group/').push();
                newGroup.idGroup = this.getId(newGroupRef.toString());
                newGroupRef.set(newGroup).then(
                    () => {
                        resolve(newGroup.idGroup);
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    /**
   * Return idGroup in function of his database ref
   * @param newGroupRef
   */
    getId(newGroupRef: string): string {
        var splitted = newGroupRef.split("/");
        return splitted[splitted.length - 1];
    }
}
