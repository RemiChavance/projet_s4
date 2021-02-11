import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
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
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        this.user = user;
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