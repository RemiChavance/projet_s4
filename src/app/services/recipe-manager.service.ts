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


  /**
   * Return next idRecipe available in a group
   */
  getNextId(idGroup: number) {
    return new Promise<number>(
      (resolve, reject) => {
        firebase.default.database()
          .ref('/group/' + idGroup + '/recipe/').orderByKey().limitToLast(1).once('value')
          .then(
            (data) => {

              const lastRecipe = data.val()[0];              
              resolve(lastRecipe.idRecipe + 1);

            }
          );
      }
    );
  }


  /**
   * Post new Recipe on database, then return it's ID
   */
  /*postRecipe(title: string, authorId: string, description: string, idGroup: number) {
    return new Promise<number>(
      (resolve, reject) => {
        this.getNextId(idGroup).then(
          (nextRecipeId) => {
            let newRecipe = new Recipe(nextRecipeId, title, description, authorId);
            newRecipe.rates = [];
            newRecipe.comments = [];
            firebase.default.database().ref('/group/' + idGroup + '/recipes/' + nextRecipeId).set(newRecipe).then(
              () => {
                resolve(nextRecipeId);
              }
            );
          }
        )
      }
    );
  }*/

}
