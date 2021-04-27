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
            user.nbComments = 0;
            user.rates = [];
            user.groups = [];
            user.favorites = [];
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
   * Return user in base by it's id
   * @param id 
   */
  getUser(id: string) {
    return new Promise<User>(
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

  /**
   * Return an array of all user in the data base
   * @returns 
   */
  getAllUser() {
    return new Promise<User[]>(
      (resolve, reject) => {
        firebase.database().ref('/user').once('value').then(
          (data) => {
            var users: User[] = [];
            const dataVal = data.val();
            for(const key in dataVal) {
              users.push(dataVal[key]);
            }
            resolve(users);
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   * Add +1 to user's comments counter
   * @param id 
   * @returns 
   */
  addNewComment(id: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.database().ref('/user/' + id + '/nbComments').once('value').then(
          (oldNbComments) => {
            firebase.database()
            .ref('/user/' + id + '/nbComments')
            .set(oldNbComments.val() + 1)
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
}
