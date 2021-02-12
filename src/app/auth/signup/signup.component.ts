import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  emailValidator = new FormControl('', [Validators.required, Validators.email]);
  hidePassword = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: this.emailValidator,
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      name: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const name = this.signUpForm.get('name').value;

    this.authService.createNewUser(email, password, name).then(
      () => {
        this.router.navigate(['/books']);
        console.log("Account created !");
        console.log("Connected !");
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  getErrorEmailMessage() {
    if (this.emailValidator.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }

    return this.emailValidator.hasError('email') ? 'Email invalide' : '';
  }
}