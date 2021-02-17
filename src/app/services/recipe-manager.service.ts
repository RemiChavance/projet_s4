import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeManagerService {

  constructor() { }

  /**
   * Return recipe by it's id
   */
  getRecipe(idGroup: number, idRecipe: number) {
    return new Promise<Recipe>(
      (resolve, reject) => {
        firebase.default.database()
          .ref('/group/' + idGroup + '/recipe/' + idRecipe)
          .once('value')
          .then(
            (recipe) => {
              resolve(recipe.val());
            }

        );
      }
    );
  }
}
