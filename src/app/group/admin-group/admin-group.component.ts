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

  // group
  group: Group;
  groupSubscription: Subscription;

  // group's recipes
  recipes: Recipe[];

  // user connected aka the admin
  user: User;
  userSubscription: Subscription;

  // Users that send requests
  requests: User[] = [];

  // Total number of comment in the group (including all recipes)
  nbComments: number = 0;

  // User that comment the most
  mostCommentUser: User;

  constructor(private groupManagerService: GroupManagerService,
              private recipeManagerService: RecipeManagerService,
              private authService: AuthService,
              private groupSubscriptionService: GroupSubscriptionService) { }

  ngOnInit() {
    // Get the current user
    this.userSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.user = user;
      }
    );

    // Get the current group
    this.groupSubscription = this.groupManagerService.currentGroup.subscribe(
      (group) => {
        this.requests = [];
        this.group = group;

        // Get all the recipe
        this.recipeManagerService.getAllRecipesFromGroup(this.group.idGroup).then(
          (recipes) => {
            this.recipes = recipes;
            // Get number of comment
            if(this.recipes) {
              this.recipes.forEach(recipe => {
                if(recipe.comments) {
                  this.nbComments = this.nbComments + recipe.comments.length;
                }
              });
            }
          }
        );

        // Get users requests
        if(this.group.requests) {
          this.group.requests.forEach(idUser => {
            this.authService.getUser(idUser).then(
              (user) => {
                this.requests.push(user);
              }
            );
          });
        }

        // Get most comments user
        var usersInGroup = [this.user];
        this.mostCommentUser = this.user;

        this.authService.getAllUser().then(
          (allUsers) => {
            allUsers.forEach(user => {
              if(user.groups.includes(group.idGroup)) {
                usersInGroup.push(user);
              }
            });

            
            usersInGroup.forEach(user => {
              if(user.nbComments > this.mostCommentUser.nbComments) {
                this.mostCommentUser = user;
              }
            });
          }
        );



      }
    );
  }


  /**
   * Accept the user into the group
   * @param idUser 
   */
  onAccept(idUser: string) {
    this.groupSubscriptionService.acceptSubscription(idUser, this.group.idGroup).then(
      () => {
        this.groupManagerService.refreshGroup();
      }
    );
  }

  /**
   * Refuse the user
   * @param idUser 
   */
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