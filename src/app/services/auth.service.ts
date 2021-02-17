import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User>(null);
  currentUser = this.userSubject.asObservable();

  constructor() { }

  changeUser(user: User) {
    this.userSubject.next(user);
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
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            let user = new User(
              firebase.auth().currentUser.uid
            );
            user.email = email;
            user.name = name;
            // -- A replacer par les valeurs du formulaire --
            //   auth/signup par la suite
            user.nbComments = 5;
            user.rates = [1, 5 , 3];
            user.groups = [];
            // ----------------------------------------------
            firebase.database().ref('/user/' + user.id).set(user);
            this.changeUser(user);
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
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            let user = new User(
              firebase.auth().currentUser.uid
            );
            this.getUser(user.id).then(
              (userData: User) => {
                this.changeUser(userData);
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
    firebase.auth().signOut();
    this.changeUser(null);
  }

  /**
   * Get user in base by it's id
   * @param id 
   */
  getUser(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/user/' + id).once('value').then(
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
