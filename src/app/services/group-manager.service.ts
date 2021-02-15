import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
    providedIn: 'root'
})
export class GroupManagerService {

    group: Group;
    groupSubject = new Subject<Group>();

    constructor() { }

    /**
     * Emit group
     */
    emitGroup() {
        this.groupSubject.next(this.group);
    }

    /**
     * return Groupe by id
     * @param id
     */
    getGroupeById(id: number) {
        return new Promise<void>(
            (resolve, reject) => {
                firebase.default.database().ref('/group/' + id).once('value').then(
                    (data) => {
                        this.group = data.val();
                        this.emitGroup();
                        resolve();
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
                firebase.default.database().ref('/group/').once('value').then(
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
