import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupManagerService } from 'src/app/services/group-manager.service';
import { GroupSubscriptionService } from 'src/app/services/group-subscription.service';
import { RecipeManagerService } from 'src/app/services/recipe-manager.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit, OnDestroy {

  group: Group;
  groupSubscription: Subscription;

  recipes: Recipe[];

  user: User;
  userSubscription: Subscription;

  requests: User[] = [];

  nbComments: number = 0;

  constructor(private groupManagerService: GroupManagerService,
              private recipeManagerService: RecipeManagerService,
              private authService: AuthService,
              private groupSubscriptionService: GroupSubscriptionService) { }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.user = user;
      }
    );

    this.groupSubscription = this.groupManagerService.currentGroup.subscribe(
      (group) => {
        this.requests = [];
        this.group = group;

        this.recipeManagerService.getAllRecipesFromGroup(this.group.idGroup).then(
          (recipes) => {
            this.recipes = recipes;
            if(this.recipes) {
              this.recipes.forEach(recipe => {
                this.nbComments = this.nbComments + recipe.comments.length;
              });
            }
          }
        );

        if(this.group.requests) {
          this.group.requests.forEach(idUser => {
            this.authService.getUser(idUser).then(
              (user) => {
                this.requests.push(user);
              }
            );
          });
        }
      }
    );
  }


  onAccept(idUser: string) {
    this.groupSubscriptionService.acceptSubscription(idUser, this.group.idGroup).then(
      () => {
        this.groupManagerService.refreshGroup();
      }
    );
  }

  onRefuse(idUser: string) {
    this.groupSubscriptionService.deleteUserFromRequest(idUser, this.group.idGroup).then(
      () => {
        this.groupManagerService.refreshGroup();
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
  }
}