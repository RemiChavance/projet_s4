import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupManagerService } from 'src/app/services/group-manager.service';
import { GroupSubscriptionService } from 'src/app/services/group-subscription.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit, OnDestroy {

  groups: Group[] = [];

  user: User;
  userSubscription: Subscription;

  constructor(private groupManagerService: GroupManagerService,
              private groupSubscriptionService: GroupSubscriptionService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.groupManagerService.getAllGroups().then(
      (data) => {
        this.groups = data;
      }
    );

    this.userSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }


  onSubscribe(idGroup: string) {
    this.groupSubscriptionService.requestSubscription(this.user.id, idGroup).then(
      () => {
        console.log("inscrit");
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
