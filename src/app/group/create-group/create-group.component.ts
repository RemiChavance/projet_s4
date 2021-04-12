import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupCreationService } from 'src/app/services/group-creation.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit, OnDestroy {

  createGroupForm: FormGroup;
  errorMessage: string;

  user: User;
  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private groupCreationService: GroupCreationService,
              private router: Router,
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
    this.createGroupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      isPublic: [false, [Validators.required]],
    });
  }

  onSubmit() {
    const name = this.createGroupForm.get('name').value;
    const isPublic = this.createGroupForm.get('isPublic').value;
    const user = this.user;
    console.log(this.user);
    console.log(isPublic);

    this.groupCreationService.createNewGroupe(name, user.id, isPublic).then(
      (id) => {
        this.router.navigate(['/group', id]);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
