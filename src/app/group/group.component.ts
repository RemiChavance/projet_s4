import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { GroupAdminService } from '../services/group-admin.service';
import { GroupManagerService } from '../services/group-manager.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  group: Group;
  groupSubscription: Subscription;
  nonExistentGroup = false;

  user: User;
  userSubscription: Subscription;

  constructor(private groupManagerService: GroupManagerService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private groupAdminService: GroupAdminService) { }

  ngOnInit(): void {
    this.group = new Group('', null);
    //this.user = new User('');

    this.groupSubscription = this.groupManagerService.groupSubject.subscribe(
      (group) => {
        if(group) {
          this.group = group;
        } else {
          this.nonExistentGroup = true;
        }
        
      }
    );
    this.groupManagerService.getGroupeById(
      this.route.snapshot.params['id']
    );

    this.userSubscription = this.authService.userSubject.subscribe(
      (user) => {
        this.user = user;
        this.authService.emitUser();
      }
    );
  }

  accessAdminPage() {
    this.groupAdminService.user = this.user;
    this.groupAdminService.group = this.group;
    this.router.navigate(['/group', this.group.idGroup, 'admin']);
  }


  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
