import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { Recipe } from '../models/recipe.model';
import { GroupManagerService } from '../services/group-manager.service';
import { RecipeManagerService } from '../services/recipe-manager.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {

  group: Group;
  groupSubscription: Subscription;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipeManagerService: RecipeManagerService,
              private groupManagerService: GroupManagerService,
              private router: Router) { }

  ngOnInit(): void {
    this.groupManagerService.refreshGroup();
    this.groupSubscription = this.groupManagerService.currentGroup.subscribe(
      (group) => {
        this.group = group;
        if(!group) {
          // groupManagerService n'a pas de groupe initialisé
          this.groupManagerService.getGroupeById(this.route.snapshot.params["id"]).then(
            () => {
              if(group === undefined) { // || group.recipes === undefined) {
                // le groupe ou le tableau de recette n'existe pas --> ne marche pas très bien
                this.router.navigate(['/home']);
              } else {
                this.recipe = this.group.recipes[this.route.snapshot.params["idRecipe"]];
              }
            }
          );
        } else {
          this.recipe = this.group.recipes[this.route.snapshot.params["idRecipe"]];
        }       
      }
    );
  }

  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
  }

}
