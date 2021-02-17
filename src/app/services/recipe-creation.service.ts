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

  createNewRecipe(title: string, prepTime: number, totalTime: number, ingredients: string, steps: string, author: string) {
    return new Promise<number>(
    (resolve, reject) => {
      const newRecipe: Recipe = new Recipe(title, prepTime, totalTime, ingredients, steps, author);
      this.getNextId().then( // Get next Id to assign it to the new group
          (nextRecipeId) => {
              newRecipe.idRecipe = nextRecipeId;
              newRecipe.rates = [];
              newRecipe.comments = [];
              // Create new recipe
              firebase.default.database().ref('group/' + this.group.idGroup + '/recipe/nextRecipeId').set(nextRecipeId + 1);
              firebase.default.database().ref('group/' + this.group.idGroup + '/recipe/' + newRecipe.idRecipe).set(newRecipe).then(
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

  getNextId() {
    return new Promise<number>(
        (resolve, reject) => {
            firebase.default.database().ref('group/' + this.group.idGroup + 'recipe/nextRecipeId')
                .once('value')
                .then(
                (data) => {
                    const lastRecipe = data.val()[0];
                    console.log(lastRecipe.idRecipe + 1);
                    resolve(lastRecipe.idRecipe + 1);
                }, (error) => {
                    reject(error);
                }
            );
        }
    );
  }
}

