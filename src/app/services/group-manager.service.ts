import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
    providedIn: 'root'
})
export class GroupManagerService {

    private groupSubject = new BehaviorSubject<Group>(null);
    currentGroup = this.groupSubject.asObservable();

    constructor() { }

    changeGroup(group: Group) {
        this.groupSubject.next(group);
    }

    refreshGroup() {
        if(this.groupSubject.value != null) {
            this.getGroupeById(this.groupSubject.value.idGroup);
        }
    }

    /**
     * return Groupe by id
     * @param id
     */
    getGroupeById(id: string) {
        return new Promise<void>(
            (resolve, reject) => {
                firebase.database().ref('/group/' + id).once('value').then(
                    (data) => {
                        this.changeGroup(data?.val());
                        resolve();
                    }, (error) => {
                        reject(error);
                    }
                );
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
