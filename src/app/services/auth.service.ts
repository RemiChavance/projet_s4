import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  userSubject = new Subject<User>();

  constructor() { }

  emitUser() {
    this.userSubject.next(this.user);
  }

  createNewUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            this.user = new User(
              firebase.default.auth().currentUser.email
            );
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.default.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            this.user = new User(
              firebase.default.auth().currentUser.email
            );
            this.emitUser();
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.default.auth().signOut();
    this.user = null;
    this.emitUser();
  }
}
