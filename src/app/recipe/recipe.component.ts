import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeManagerService } from '../services/recipe-manager.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe;

  // Plus tard : récupérer le groupe uniquement, puis prendre la recette en fonction du param URL

  constructor(private route: ActivatedRoute,
              private recipeManager: RecipeManagerService) { }

  ngOnInit(): void {
    this.recipeManager.getRecipe(
      this.route.snapshot.params["id"],
      this.route.snapshot.params["idRecipe"]
    ).then(
      (recipe) => {
        this.recipe = recipe;
      }
    )
  }

}
