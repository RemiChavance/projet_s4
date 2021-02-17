import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageCreationService } from 'src/app/services/message-creation.service';


@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  createMessageForm: FormGroup;

  user : User;
  userSubscription: Subscription


  @Input() idRecipe: number;

  constructor(private formBuilder: FormBuilder,
              private messageCreationService: MessageCreationService,
              private authService: AuthService

    ) { }

  ngOnInit(): void {
    console.log("Create-comment component, idRecipe : " + this.idRecipe);
  }

}
