import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/group.model';
import { Recipe } from '../models/recipe.model';
import { GroupManagerService } from '../services/group-manager.service';
import { RecipeManagerService } from '../services/recipe-manager.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  group: Group;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipeManagerService: RecipeManagerService,
              private groupManagerService: GroupManagerService) { }

  ngOnInit(): void {
    this.groupManagerService.groupSubject.subscribe(
      (group) => {
        this.group = group;
        this.recipe = this.group.recipes[this.route.snapshot.params["idRecipe"]];
      }
    );
    this.groupManagerService.emitGroup();
  }

}
