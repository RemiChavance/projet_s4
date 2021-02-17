import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentCreationService {

  constructor() { }

  /**
   * Post comment
   * @param description
   * @param author 
   * @param idGroup 
   * @param idRecipe 
   */
  createNewComment(description: string, idAuthor: string, idGroup: number, idRecipe: number) {
    return new Promise<void>(
      (resolve, reject) => {
        this.getNextId(idGroup, idRecipe).then(
          (nextCommentId) => {
            let newComment = new Comment(nextCommentId, description, idAuthor);
            firebase.database()
              .ref("/group/" + idGroup + "/recipes/" + idRecipe + "/comments/" + nextCommentId).set(newComment)
              .then(
                () => {
                  resolve();
                }
            );
          }, (error) => {
            reject(error);
          }
        )
      }
    );
  }


  /**
   * Return next idComment in a recipe
   */
  getNextId(idGroup: number, idRecipe: number) {
    return new Promise<number>(
      (resolve, reject) => {
          firebase.database()
            .ref("/group/" + idGroup + "/recipes/" + idRecipe + "/comments/")
            .orderByKey()
            .limitToLast(1)
            .once('value')
            .then(
              (data) => {
                if(data.val()) {
                  let lastComment: Comment;
                  let dataVal = data.val();
                  for(let key in dataVal) {
                    lastComment = dataVal[key];
                  }
                  resolve(lastComment.idComment + 1);
                } else {
                  resolve(0);
                }
              }
            );
      } 
    );
  }

}