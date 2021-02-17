import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Group } from '../models/group.model';
import { Recipe } from '../models/recipe.model';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class RecipeCreationService {

  group: Group;
  recipe: Recipe;

  constructor() {}

  createNewRecipe(title: string, prepTime: number, totalTime: number, ingredients: string, steps: string, author: string, idGroup: number) {
    return new Promise<number>(
    (resolve, reject) => {
      this.getNextId(idGroup).then( // Get next Id to assign it to the new group
          (nextRecipeId) => {
              const newRecipe: Recipe = new Recipe(nextRecipeId, title, prepTime, totalTime, ingredients, steps, author);
              newRecipe.rates = [];
              newRecipe.comments = [];
              // Create new recipe
              firebase.database().ref('group/' + idGroup + '/recipes/' + newRecipe.idRecipe).set(newRecipe).then(
                  () => {
                      resolve(newRecipe.idRecipe);
                  }
              );
          }, (error) => {
              reject(error);
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
        firebase.database()
          .ref('/group/' + idGroup + '/recipes')
          .orderByKey()
          .limitToLast(1)
          .once('value')
          .then(
            (data: DataSnapshot) => {
              if(data.val()) {
                let lastRecipe: Recipe;
                let dataVal = data.val();
                for(let key in dataVal) {
                  lastRecipe = dataVal[key];
                }            
                resolve(lastRecipe.idRecipe + 1);
              } else {
                resolve(0);
              }
            }
          );
      }
    );
  }
}

