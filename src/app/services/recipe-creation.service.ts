import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Group } from '../models/group.model';
import { Recipe } from '../models/recipe.model';
import { User } from '../models/user.model';

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
              firebase.default.database().ref('group/' + idGroup + '/recipes/' + newRecipe.idRecipe).set(newRecipe).then(
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
        firebase.default.database()
          .ref('/group/' + idGroup + '/recipes')
          .orderByKey()
          .limitToLast(1)
          .once('value')
          .then(
            (data) => {
              if(data.val()) {
                console.log(data);
                const lastRecipe = data.toJSON();                
                console.log(lastRecipe);            
                resolve(0);
              } else {
                resolve(0);
              }
            }
          );
      }
    );
  }
}

