import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  emailValidator = new FormControl('', [Validators.required, Validators.email]);
  passwordValidator = new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]);
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
      password: this.passwordValidator
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/home']);
        console.log("Connected ! ")
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