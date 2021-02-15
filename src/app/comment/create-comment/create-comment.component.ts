import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  
  @Input() idRecipe: number;

  constructor() { }

  ngOnInit(): void {
    console.log("Create-comment component, idRecipe : " + this.idRecipe);
  }

}
