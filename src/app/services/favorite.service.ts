import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { }

  /**
   * Add a favorite to user
   * @param idRecipe 
   * @param idUser 
   */
  postNewFavorite(idRecipe: string, idUser: string) {
    return new Promise<void>(
      (resolve, reject) => {
        this.getNextId(idUser).then(
          (nextFavoriteId) => {
            firebase.database()
            .ref('user/' + idUser + '/favorites/' + nextFavoriteId)
            .set(idRecipe)
            .then(
              () => {
                console.log(idRecipe);
                resolve();
              }
            );
          }
        );
      }
    );
  }

  /**
   * Return new available id
   * @param idUser 
   */
   getNextId(idUser: string) {
    return new Promise<number>(
      (resolve, reject) => {
        firebase.database()
          .ref('user/' + idUser + '/favorites/')
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
   * Upload favorite array to user database
   * @param favorites 
   * @param idUser 
   * @returns 
   */
  deleteFavorite(favorites: string[], idUser: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.database()
        .ref('user/' + idUser + '/favorites')
        .set(favorites)
        .then(
          () => {
            resolve();
          }
        );
      }
    );
  }
}
