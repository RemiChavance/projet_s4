import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from "../models/user.model";
import { Comment } from "../models/comment.model";
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class MessageCreationService {

  constructor() { }

  createNewMessage(idComment: number,description: string, author : User) {
    return new Promise<number>(
      (resolve, reject) => {
        let newComment: Comment = new Comment (idComment,description, author);
        this.getNextId().then(
          (nextCommentId) => {
            newComment.idComment = nextCommentId;
            firebase.default.database().ref('/group/nextCommentId').set(nextCommentId + 1);
            firebase.default.database().ref('/group/' + newComment.idComment).set(newComment).then(
              () => {
                resolve(newComment.idComment);
              }
            );
          }, (error) => {
            reject(error);
          }
        )
      }
    );
  }



  getNextId() {
    return new Promise<number>(
      (resolve, reject) => {
          firebase.default.database().ref('/group/nextCommentId')
              .once('value')
              .then(
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