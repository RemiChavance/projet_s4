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

  fullStars: number[] = [];
  emptyStars: number[] = [];
  moyenne: number = 0;

  constructor(private route: ActivatedRoute,
              private recipeManagerService: RecipeManagerService) { }

  ngOnInit(): void {
    this.recipeManagerService.currentRecipe.subscribe(
      (recipe) => {
        this.recipe = recipe;
        this.initRating();
      }
    );
    this.recipeManagerService.getRecipeById(this.route.snapshot.params['idRecipe']).then();
  }


  initRating() {
    this.emptyStars = [];
    this.fullStars = [];
    this.moyenne = 0;

    if(this.recipe && this.recipe.rates) {
      let nbRate: number = this.recipe.rates.length;
      this.recipe.rates.forEach(rate => {
        this.moyenne = this.moyenne + rate.description;
      });

      // Calcul de la moyenne
      this.moyenne = this.moyenne / nbRate;
      let moyStars = Math.round(this.moyenne);

      // Affichage des étoiles
      for(let i=0; i<moyStars; i++) {
        this.fullStars.push(1);
      }
      for(let i=0; i<(5-moyStars); i++) {
        this.emptyStars.push(1);
      }
    } else {
      for(let i=0; i<5; i++) {
        this.emptyStars.push(1);
      }
    }
  }
}
