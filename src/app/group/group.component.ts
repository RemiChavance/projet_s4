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

    this.groupManagerService.getGroupeById(this.route.snapshot.params['id']).then(
      () => {
        this.groupSubscription = this.groupManagerService.currentGroup.subscribe(
          (group) => {
            if(group) {
              this.group = group;
            } else {
              this.nonExistentGroup = true;
            }
          }
        );
      }
    );

    this.userSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  accessAdminPage() {
    this.groupAdminService.user = this.user;
    this.groupAdminService.group = this.group;
    this.router.navigate(['/group', this.group.idGroup, 'admin']);
  }


  onClickAddRecipe() {
    this.router.navigate(['/group', this.group.idGroup, 'create-recipe']);
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
  }
}
