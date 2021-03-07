import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupAdminService } from 'src/app/services/group-admin.service';
import { GroupSubscriptionService } from 'src/app/services/group-subscription.service';
import { RecipeManagerService } from 'src/app/services/recipe-manager.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {

  group: Group;
  recipes: Recipe[];
  user: User;

  requests: User[] = [];

  nbComments: number = 0;

  constructor(private groupAdminService: GroupAdminService,
              private recipeManagerService: RecipeManagerService,
              private authService: AuthService,
              private groupSubscriptionService: GroupSubscriptionService) { }

  ngOnInit() {
    this.user = this.groupAdminService.user;
    this.group = this.groupAdminService.group;

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


  onAccept(idUser: string) {
    this.groupSubscriptionService.acceptSubscription(idUser, this.group.idGroup);
  }

  onRefuse(idUser: string) {
    console.log("ne fait rien pour l'instant");
  }
}