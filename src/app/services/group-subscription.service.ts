import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GroupSubscriptionService {

  constructor() { }


  /**
   * Set a new request to subscribe to a group
   * @param idUser 
   * @param idGroup 
   */
  requestSubscription(idUser: string, idGroup: string) {
    return new Promise<void>(
      (resolve, reject) => {
        this.getNextRequestId(idGroup).then(
          (nextRequestId) => {
            firebase.database()
              .ref('group/' + idGroup + '/requests/' + nextRequestId)
              .set(idUser)
              .then(
                () => {
                  resolve();
                }
              );
          }
        );
      }
    );
  }


   /**
   * Get next id for request array
   * @param idGroup 
   */
  getNextRequestId(idGroup: string) {
    return new Promise<number>(
      (resolve, reject) => {
        firebase.database()
          .ref('group/' + idGroup + '/requests/')
          .orderByKey()
          .limitToLast(1)
          .once('value')
          .then(
            (data) => {
              if(data.val()) {
                let lastId: number;
                const dataVal = data.val();
                for(const key in dataVal) {
                  lastId = parseInt(key);
                }
                resolve(lastId + 1);
              } else {
                resolve(0);
              }
            }
          );
      }
    );
  }


  /**
   * Accept subscription to a group
   * @param idUser 
   * @param idGroup 
   */
  acceptSubscription(idUser: string, idGroup: string) {
    return new Promise<void>(
      (resolve, reject) => {
        this.getNextGroupId(idUser).then(
          (nextGroupId) => {
            firebase.database()
              .ref('user/' + idUser + '/groups/' + nextGroupId)
              .set(idGroup)
              .then(
                () => {
                  this.deleteUserFromRequest(idUser, idGroup).then(
                    () => {
                      resolve();
                    }
                  );
                }
              );
          }
        );
      } 
    );
  }

  /**
   * Get next id for group array
   * @param idUser 
   */
  getNextGroupId(idUser: string) {
    return new Promise<number>(
      (resolve, reject) => {
        firebase.database()
          .ref('user/' + idUser + '/groups/')
          .orderByKey()
          .limitToLast(1)
          .once('value')
          .then(
            (data) => {
              if(data.val()) {
                let lastId: number;
                const dataVal = data.val();
                for(const key in dataVal) {
                  lastId = parseInt(key);
                }
                resolve(lastId + 1);
              } else {
                resolve(0);
              }
            }
          );
      }
    );
  }

  /**
   * Delete user from group's request array 
   * @param idUser 
   * @param idGroup 
   */
  deleteUserFromRequest(idUser: string, idGroup: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.database()
          .ref('group/' + idGroup + '/requests/')
          .once('value')
          .then(
            (data) => {
              let dataArray = [];
              const dataVal = data.val();
              let i = 0;
              for(const key in dataVal) {
                if(dataVal[key] != idUser) {
                  dataArray[i] = dataVal[key];
                  i++;
                }
              }
              firebase.database()
                .ref('group/' + idGroup + '/requests/')
                .set(dataArray)
                .then(
                  () => {
                    resolve();
                  }
                );
            }
          );
      }
    );
  }


 
}
