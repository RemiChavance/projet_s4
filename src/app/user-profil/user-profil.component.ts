import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { Recipe } from '../models/recipe.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { GroupManagerService } from '../services/group-manager.service';
import { RecipeManagerService } from '../services/recipe-manager.service';

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

  favoritesRecipe: Recipe[] = [];

  constructor(private authService: AuthService,
              private groupManagerService: GroupManagerService,
              private recipeManageService: RecipeManagerService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.user = user;

        // Groups
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

        // Recipes
        this.user.favorites.forEach(idRecipe => {
          console.log(idRecipe);
          this.recipeManageService.getUniqueRecipeById(idRecipe).then(
            (recipe) => {
              this.favoritesRecipe.push(recipe);
            }
          )
        });

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

  onNavigateToRecipe(recipe: Recipe) {
    this.router.navigate(["/group", recipe.idGroup, "recipe", recipe.idRecipe]);
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
