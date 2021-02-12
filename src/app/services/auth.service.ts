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

  /**
   * Call this fonction when user is changed
   */
  emitUser() {
    this.userSubject.next(this.user);
    console.log(this.user);
  }

  /**
   * Create a new user in base and connect him
   * @param email 
   * @param password 
   * @param name
   */
  createNewUser(email: string, password: string, name: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            this.user = new User(
              firebase.default.auth().currentUser.uid
            );
            this.user.email = email;
            this.user.name = name;
            //-- A replacer par les valeurs du formulaire --
            //   auth/signup par la suite
            this.user.nbComments = 5;
            this.user.rates = [1, 5 , 3];
            this.user.groups = [];
            //----------------------------------------------
            firebase.default.database().ref('/user/' + this.user.id).set(this.user);
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

  /**
   * Connect user
   * @param email 
   * @param password 
   */
  signInUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.default.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            this.user = new User(
              firebase.default.auth().currentUser.uid
            );
            this.getUser(this.user.id).then(
              (user: User) => {
                this.user = user;
                this.emitUser();
              }
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

  /**
   * Disconnect user
   */
  signOutUser() {
    firebase.default.auth().signOut();
    this.user = null;
    this.emitUser();
  }

  /**
   * Get user in base by it's id
   * @param id 
   */
  getUser(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.default.database().ref('/user/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
