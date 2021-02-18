  import {Component, OnDestroy, OnInit} from '@angular/core';
  import {FormBuilder, FormGroup, Validators} from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Subscription } from 'rxjs';
  import { Recipe } from 'src/app/models/recipe.model';
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
  export class CreateRecipeComponent implements OnInit, OnDestroy {

    isLinear = false;

    titleFormGroup: FormGroup;
    prepTimeFormGroup: FormGroup;
    totalTimeFormGroup: FormGroup;
    ingredientsFormGroup: FormGroup;
    stepsFormGroup: FormGroup;

    errorMessage: string;

    recipe: Recipe;

    user: User;
    userSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private recipeCreationService: RecipeCreationService,
                private router: Router,
                private authService: AuthService,
                private route: ActivatedRoute) { }

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
      console.log('envoye');
      const title = this.titleFormGroup.get('title').value;
      const prepTime = this.prepTimeFormGroup.get('prepTime').value;
      const totalTime = this.totalTimeFormGroup.get('totalTime').value;
      const ingredients = this.ingredientsFormGroup.get('ingredients').value;
      const steps = this.stepsFormGroup.get('steps').value;
      const author = this.user;

      this.recipeCreationService.createNewRecipe(title, prepTime, totalTime, ingredients, steps, author.id, this.route.snapshot.params['id']).then(
        (newRecipeId) => {
          this.router.navigate(['/group', this.route.snapshot.params['id'], 'recipe', newRecipeId]);
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
