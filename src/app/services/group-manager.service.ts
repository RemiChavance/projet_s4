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
}
