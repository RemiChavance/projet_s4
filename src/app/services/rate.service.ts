import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor() { }

  postRate(rate: number, idRecipe: number) {
    return new Promise<void>(
      (resolve, reject) => {
        this.getNextId(idRecipe).then(
          (nextRateId) => {
            firebase.database()
            .ref('recipe/' + idRecipe + '/rates/' + nextRateId)
            .set(rate)
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

  getNextId(idRecipe: number) {
    return new Promise<number>(
      (resolve, reject) => {
        firebase.database()
          .ref('recipe/' + idRecipe + '/rates/')
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
}
