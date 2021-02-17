import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentCreationService } from 'src/app/services/comment-creation.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  
  @Input() idRecipe: number;
  @Input() idGroup: number;

  createCommentForm: FormGroup;
  
  user: User;
  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private commentCreationService: CommentCreationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  initForm() {
    this.createCommentForm = this.formBuilder.group({
      comment: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const comment = this.createCommentForm.get('comment').value;

    this.commentCreationService.createNewComment(comment, this.user.id, this.idGroup, this.idRecipe).then(
      () => {
        console.log("posté");
      }
    )
  }

}