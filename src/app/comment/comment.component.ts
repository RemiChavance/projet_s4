import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @Input() comment: Comment;

  user: User;

  ngOnInit(): void {
    this.authService.getUser(this.comment.idAuthor).then(
      (user) => {
        this.user = user;
      }
    );
  }

}
