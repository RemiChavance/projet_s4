import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Subject } from "rxjs";
import { Group } from "../models/group.model";

@Injectable({
    providedIn: 'root'
})
export class GroupManagerService {
  
    group: Group;
    groupSubject = new Subject<Group>();

    constructor() { }


    /**
     * return Groupe by id
     * @param id
     */
    getGroupeById(id: number) {
        return new Promise<Group>(
            (resolve, reject) => {
                firebase.default.database().ref('/group/' + id).once('value').then(
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
