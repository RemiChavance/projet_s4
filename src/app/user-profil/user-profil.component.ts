import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  user: User;
  userSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

}
