import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  /**
   * Upload file to Firebase Storage
   * @param file 
   * @param idRecipe 
   * @returns 
   */
  uploadFile(file: File, idRecipe: string) {
    return new Promise<void>(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement ...');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (url) => {
                this.addUrlFileToRecipe(url, idRecipe).then(
                  () => {
                    console.log("Envoyé !")
                    resolve();
                  }
                );
              }
            )
          }
        );
      }
    );
  }

  /**
   * Add file's URL to recipe's images
   * @param url 
   * @param idRecipe 
   * @returns 
   */
  addUrlFileToRecipe(url: any, idRecipe: string) {
    return new Promise<void>(
      (resolve, reject) => {
        this.getNextId(idRecipe).then(
          (nextPhotoId) => {
            firebase.database()
            .ref('recipe/' + idRecipe + '/photos/' + nextPhotoId)
            .set(url)
            .then(
              () => {
                resolve();
              }
            )
          }
        )
      }
    )
  }

  /**
   * Return new available id
   * @param idRecipe 
   */
   getNextId(idRecipe: string) {
    return new Promise<number>(
      (resolve, reject) => {
        firebase.database()
          .ref('recipe/' + idRecipe + '/photos/')
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