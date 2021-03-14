import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Recipe } from '../models/recipe.model';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class RecipeCreationService {

  constructor() {}

  createNewRecipe(title: string, type: string, prepTime: number, totalTime: number, ingredients: string[], steps: string[], description: string, author: string, idGroup: number) {
    return new Promise<string>(
      (resolve, reject) => {
        const newRecipe: Recipe = new Recipe("-1", idGroup, title, type, prepTime, totalTime, ingredients, steps, description, author, [], []);

        const newRecipeRef = firebase.database().ref('recipe/').push();
        newRecipe.idRecipe = this.getId(newRecipeRef.toString());
        newRecipeRef.set(newRecipe).then(
          () => {
            resolve(newRecipe.idRecipe);
          }
        );
      }
    );
  }


  /**
   * Return idRecipe in function of his database ref
   * @param newRecipeRef
   */
  getId(newRecipeRef: string): string {
    var splitted = newRecipeRef.split("/");
    return splitted[splitted.length - 1];
  }
}

