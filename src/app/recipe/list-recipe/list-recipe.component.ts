import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent implements OnInit {

  @Input() recipes: Recipe[];
  @Input() idGroup: number;

  constructor( ) { }

  ngOnInit(): void {
  }
}
