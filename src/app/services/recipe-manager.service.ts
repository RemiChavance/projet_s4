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

  getAllRecipesFromGroup (idGroup: number) {
    return new Promise<Recipe[]>(
      (resolve, reject) => {
        console.log(idGroup);
        firebase.default.database().ref('/group/' + idGroup + '/recipes/').once('value').then(
            (data) => {
                let dataArray = new Array<Recipe>();
                let dataVal = data.val();
                for (let key in dataVal) {
                    dataArray.push(dataVal[key]);
                }
                resolve(dataArray);
            }
        );
      }
    );
  }
}
