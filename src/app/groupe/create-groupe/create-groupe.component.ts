import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupeService } from 'src/app/services/groupe.service';

@Component({
  selector: 'app-create-groupe',
  templateUrl: './create-groupe.component.html',
  styleUrls: ['./create-groupe.component.css']
})
export class CreateGroupeComponent implements OnInit {

  createGroupForm: FormGroup;
  errorMessage: string;

  user: User;
  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private groupeService: GroupeService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.authService.emitUser();
  }

  initForm() {
    this.createGroupForm = this.formBuilder.group({
      nom: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const nom = this.createGroupForm.get('nom').value;
    const user = this.user;

    this.groupeService.createNewGroupe(nom, user).then(
      () => {
        this.router.navigate(['/books']); //navigate to the group page
      },
      (error) => {
        this.errorMessage = error;
      }
    );    
  }
}
