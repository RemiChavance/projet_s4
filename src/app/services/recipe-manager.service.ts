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
          .ref("/group/" + idGroup + "/recipes/" + idRecipe)
          .once("value")
          .then(
            (recipe) => {
              resolve(recipe.val());
            }
            
        )
      }
    );
  }


  /**
   * Return next idRecipe available in a group
   */
  getNextId(idGroup: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.default.database()
          .ref("/group/" + idGroup + "/recipes/").orderByKey().limitToLast(1).once('value')
          .then(
            (data) => {
              const lastRecipe = data.val()[0];              
              console.log(lastRecipe.idRecipe + 1);
              
            }
          )
      }
    );
  }

}
