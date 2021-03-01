import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User;
  userSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
      }
    );

    // Vérification de la connection
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.authService.getUser(user.uid).then(
            (data: User) => {
              //console.log(data);
              this.authService.changeUser(data);
            }
          );
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}