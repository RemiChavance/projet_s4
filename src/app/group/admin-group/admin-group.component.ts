import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { GroupAdminService } from 'src/app/services/group-admin.service';
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

  nbComments: number = 0;

  constructor(private groupAdminService: GroupAdminService,
              private recipeManagerService: RecipeManagerService) { }

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
  }
}