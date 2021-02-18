import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { Recipe } from 'src/app/models/recipe.model';
import { GroupManagerService } from 'src/app/services/group-manager.service';
import { RecipeManagerService } from 'src/app/services/recipe-manager.service';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent implements OnInit {

  recipes: Recipe[] = [];
  group: Group;
  recipe: Recipe;

  constructor(
    private recipeManagerService: RecipeManagerService,
    private groupManagerService: GroupManagerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.recipeManagerService.getAllRecipesFromGroup(this.route.snapshot.params.id).then(
      (data) => {
        this.recipes = data;
      }
    );
    this.groupManagerService.getGroupeById(this.route.snapshot.params.id).then(
      (group) => {
        this.group = group;
        if (group.recipes) {
          this.recipe = this.group.recipes[this.route.snapshot.params.idRecipe];
        }
      }
    );
  }

}
