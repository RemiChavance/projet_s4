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
  createNewComment(description: string, idAuthor: string, idRecipe: string) {
    return new Promise<void>(
      (resolve, reject) => {
        this.getNextId(idRecipe).then(
          (nextCommentId) => {
            const newComment = new Comment(nextCommentId, description, idAuthor);
            firebase.database()
              .ref('/recipe/' + idRecipe + '/comments/' + nextCommentId).set(newComment)
              .then(
                () => {
                  resolve();
                }
            );
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }


  /**
   * Return next idComment in a recipe
   */
  getNextId(idRecipe: string) {
    return new Promise<number>(
      (resolve, reject) => {
          firebase.database()
            .ref('recipe/' + idRecipe + '/comments/')
            .orderByKey()
            .limitToLast(1)
            .once('value')
            .then(
              (data) => {
                if(data.val()) {
                  let lastComment: Comment;
                  const dataVal = data.val();
                  for(const key in dataVal) {
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
