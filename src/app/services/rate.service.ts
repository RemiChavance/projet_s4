import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Rate } from '../models/rate.model';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor() { }

  /**
   * Create new Rate
   * @param rate 
   * @param idRecipe 
   * @param idAuthor 
   */
  postNewRate(rate: number, idRecipe: number, idAuthor: string) {
    return new Promise<void>(
      (resolve, reject) => {
        this.getNextId(idRecipe).then(
          (nextRateId) => {
            const newRate = new Rate(nextRateId, rate, idAuthor);
            firebase.database()
            .ref('recipe/' + idRecipe + '/rates/' + nextRateId)
            .set(newRate)
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
   * Repost a Rate
   * @param rate 
   * @param idRecipe 
   */
  repostRate(rate: Rate, idRecipe: number) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.database()
        .ref('recipe/' + idRecipe + '/rates/' + rate.idRate)
        .set(rate)
        .then(
          () => {
            resolve();
          }
        );
      }
    );
  }

  /**
   * Return new available id
   * @param idRecipe 
   */
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
