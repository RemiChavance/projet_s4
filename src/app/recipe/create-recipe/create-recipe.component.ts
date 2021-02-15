  import {Component, OnInit} from '@angular/core';
  import {FormBuilder, FormGroup, Validators} from '@angular/forms';
  import { Router } from '@angular/router';
  import { Subscription } from 'rxjs';
  import { User } from 'src/app/models/user.model';
  import { AuthService } from 'src/app/services/auth.service';
  import { RecipeCreationService } from 'src/app/services/recipe-creation.service';

  /**
   * @title Stepper overview
   */
  @Component({
    selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
  })
  export class CreateRecipeComponent implements OnInit {

    isLinear = false;

    titleFormGroup: FormGroup;
    prepTimeFormGroup: FormGroup;
    totalTimeFormGroup: FormGroup;
    ingredientsFormGroup: FormGroup;
    stepsFormGroup: FormGroup;

    errorMessage: string;

    user: User;
    userSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private recipeCreationService: RecipeCreationService,
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
      this.titleFormGroup = this.formBuilder.group({
        title: ['', [Validators.required]]
      });
      this.prepTimeFormGroup = this.formBuilder.group({
        prepTime: ['', Validators.required]
      });
      this.totalTimeFormGroup = this.formBuilder.group({
        totalTime: ['', Validators.required]
      });
      this.ingredientsFormGroup = this.formBuilder.group({
        ingredients: ['', Validators.required]
      });
      this.stepsFormGroup = this.formBuilder.group({
        steps: ['', Validators.required]
      });
    }

    onSubmit() {
      const title = this.titleFormGroup.get('title').value;
      const prepTime = this.prepTimeFormGroup.get('prepTime').value;
      const totalTime = this.totalTimeFormGroup.get('totalTime').value;
      const ingredients = this.ingredientsFormGroup.get('ingredients').value;
      const steps = this.stepsFormGroup.get('steps').value;
      const author = this.user;

      // console.log(this.user);

      this.recipeCreationService.createNewRecipe(title, prepTime, totalTime, ingredients, steps, author.id).then(
        (id) => {
          this.router.navigate(['group/', id, '/recipe/:', id]);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
