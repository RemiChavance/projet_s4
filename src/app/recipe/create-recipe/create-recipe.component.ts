  import {Component, OnDestroy, OnInit} from '@angular/core';
  import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Subscription } from 'rxjs';
  import { Recipe } from 'src/app/models/recipe.model';
  import { User } from 'src/app/models/user.model';
  import { AuthService } from 'src/app/services/auth.service';
  import { RecipeCreationService } from 'src/app/services/recipe-creation.service';

  interface Type {
    value: string;
    viewValue: string;
  }

  /**
   * @title Stepper overview
   */
  @Component({
    selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
  })
  export class CreateRecipeComponent implements OnInit, OnDestroy {

    types: Type[] = [
      {value: 'Entrée', viewValue: 'Entrée'},
      {value: 'Plat Principal', viewValue: 'Plat principal'},
      {value: 'Dessert', viewValue: 'Dessert'}
    ];

    titleFormGroup: FormGroup;
    typeFormGroup: FormGroup;
    prepTimeFormGroup: FormGroup;
    totalTimeFormGroup: FormGroup;
    ingredientsFormGroup: FormGroup;
    stepsFormGroup: FormGroup;
    descripFormGroup: FormGroup;

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
      this.typeFormGroup = this.formBuilder.group({
        type: ['', [Validators.required]]
      });
      this.prepTimeFormGroup = this.formBuilder.group({
        prepTime: ['', Validators.required]
      });
      this.totalTimeFormGroup = this.formBuilder.group({
        totalTime: ['', Validators.required]
      });
      this.ingredientsFormGroup = this.formBuilder.group({
        ingredients: this.formBuilder.array([])
      });
      this.stepsFormGroup = this.formBuilder.group({
        steps: this.formBuilder.array([])
      });
      this.descripFormGroup = this.formBuilder.group({
        description: ['', Validators.required]
      });
    }

    onSubmit() {
      const title = this.titleFormGroup.get('title').value;
      const type = this.typeFormGroup.get('type').value;
      const prepTime = this.prepTimeFormGroup.get('prepTime').value;
      const totalTime = this.totalTimeFormGroup.get('totalTime').value;
      const ingredients = this.ingredientsFormGroup.get('ingredients').value;
      const steps = this.stepsFormGroup.get('steps').value;
      const description = this.descripFormGroup.get('description').value;
      const author = this.user;

      this.recipeCreationService.createNewRecipe(
        title, type, prepTime, totalTime, ingredients, steps, description, author.id, this.route.snapshot.params['id']).then(
        (newRecipeId) => {
          this.router.navigate(['/group', this.route.snapshot.params['id'], 'recipe', newRecipeId]);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }

    // Gère la création dynamique d'input dans le formulaire pour les ingrédients et les étapes
    getIngredients(): FormArray {
      return this.ingredientsFormGroup.get('ingredients') as FormArray;
    }
    onAddIngredient() {
      const newIngredientControl = this.formBuilder.control(null, Validators.required);
      this.getIngredients().push(newIngredientControl);
    }
    onDelIngredient() {
      this.getIngredients().removeAt(this.getIngredients().length-1);
    }

    getSteps(): FormArray {
      return this.stepsFormGroup.get('steps') as FormArray;
    }
    onAddStep() {
      const newStepControl = this.formBuilder.control(null, Validators.required);
      this.getSteps().push(newStepControl);
    }
    onDelStep() {
      this.getSteps().removeAt(this.getSteps().length-1);
    }




    ngOnDestroy() {
      this.userSubscription.unsubscribe();
    }
  }
