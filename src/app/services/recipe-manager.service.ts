import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeManagerService {

  private recipeSubject = new BehaviorSubject<Recipe>(null);
  currentRecipe= this.recipeSubject.asObservable();

  constructor() { }

  changeRecipe(recipe: Recipe) {
      this.recipeSubject.next(recipe);
  }

  refreshRecipe() {
    if(this.recipeSubject.value != null) {
        this.getRecipeById(this.recipeSubject.value.idRecipe);
    }
  }

  /**
   * Get recipe by it's id
   * @param idRecipe 
   */
  getRecipeById(idRecipe: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.database()
          .ref('recipe/' + idRecipe)
          .once('value')
          .then(
            (recipe) => {
              this.changeRecipe(recipe.val());
              resolve();
            }
          );
      }
    );
  }

  
  /**
   * Get all recipe from a group
   * @param idGroup
   */
  getAllRecipesFromGroup(idGroup: number) {
    return new Promise<Recipe[]>(
      (resolve, reject) => {
        firebase.database()
          .ref('recipe/')
          .orderByChild("idGroup")
          .equalTo(idGroup.toString())
          .once('value').then(
            (data) => {
              let dataArray = new Array<Recipe>();
              let dataVal = data.val();
              for (let key in dataVal) {
                  dataArray.push(dataVal[key]);
              }
              console.log(dataArray);
              resolve(dataArray);
            }
        );
      }
    );
  }
}
