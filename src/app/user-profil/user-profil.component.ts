import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { GroupManagerService } from '../services/group-manager.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit, OnDestroy {

  user: User;
  userSubscription: Subscription;

  groupsAdmin: Group[] = [];
  groupsMember: Group[] = [];

  constructor(private authService: AuthService,
              private groupManagerService: GroupManagerService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.user = user;
        this.groupManagerService.getAllGroups().then(
          (groups) => {

            this.groupsAdmin = [];
            this.groupsMember = [];

            groups.forEach(group => {
              
              if(group.adminId == this.user.id) {
                this.groupsAdmin.push(group);
              } 

              if(this.user.groups != undefined && this.user.groups.includes(group.idGroup)) {
                this.groupsMember.push(group);
              }              
            });
          }
        );
      }
    );
  }

  onNavigateToGroup(idGroup: string) {
    this.groupManagerService.getGroupeById(idGroup).then(
      () => {
        this.router.navigate(['/group', idGroup]);
      }
    );
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
