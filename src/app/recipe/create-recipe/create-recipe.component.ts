import { Component, OnInit } from '@angular/core';
import { RecipeManagerService } from 'src/app/services/recipe-manager.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  constructor(private recipeManagerService: RecipeManagerService) { }

  ngOnInit(): void {
  }

  onCreate() {
    this.recipeManagerService.postRecipe(
      "nouvelle recette",
      "jyuTVfoFMjVKAPiv75xGtbvEUmy1",
      "c'est une super recette",
      3
    ).then(
      (recipeId) => {
        console.log("recipe created with id : " + recipeId);
      }
    );
  }

}
