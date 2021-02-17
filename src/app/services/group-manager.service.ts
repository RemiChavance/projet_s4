import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Group } from '../models/group.model';

@Injectable({
    providedIn: 'root'
})
export class GroupManagerService {

    constructor() { }

    /**
     * return Groupe by id
     * @param id
     */
    getGroupeById(id: number) {
        return new Promise<Group>(
            (resolve, reject) => {
                firebase.database().ref('/group/' + id).once('value').then(
                    (data) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                )
            }
        );
    }

    /**
     * Return all groups
     */
    getAllGroups() {
        return new Promise<Group[]>(
            (resolve, reject) => {
                firebase.database().ref('/group/').once('value').then(
                    (data) => {
                        let dataArray = new Array<Group>();
                        let dataVal = data.val();
                        for (let key in dataVal) {
                            dataArray.push(dataVal[key]);
                        }
                        dataArray.splice(-1, 1);
                        resolve(dataArray);
                    }
                );
            }
        );
    }
}
