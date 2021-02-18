
// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
// custom
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { GroupComponent } from './group/group.component';
import { GroupCreationService } from './services/group-creation.service';
import { GroupManagerService } from './services/group-manager.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGroupComponent } from './group/admin-group/admin-group.component';
import { GroupAdminGuardService } from './services/group-admin-guard.service';
import { GroupAdminService } from './services/group-admin.service';
// comments
import { ListGroupComponent } from './group/list-group/list-group.component';
import { CommentComponent } from './comment/comment.component';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';
import { CommentCreationService } from './services/comment-creation.service';
// recipes
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeManagerService } from './services/recipe-manager.service';
import { ListRecipeComponent } from './recipe/list-recipe/list-recipe.component';
import { CreateRecipeComponent } from './recipe/create-recipe/create-recipe.component';



const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'group/create-group', canActivate: [AuthGuardService], component: CreateGroupComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'group/:id/admin', canActivate: [GroupAdminGuardService], component: AdminGroupComponent },
  { path: 'group/:id/recipes/:idRecipe', component: RecipeComponent },
  { path: 'group/:id/create-recipe', component: CreateRecipeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    HomeComponent,
    CreateGroupComponent,
    GroupComponent,
    AdminGroupComponent,
    RecipeComponent,
    CreateRecipeComponent,
    ListGroupComponent,
    CommentComponent,
    CreateCommentComponent,
    ListRecipeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    GroupCreationService,
    GroupManagerService,
    GroupAdminGuardService,
    GroupAdminService,

    RecipeManagerService,
    CommentCreationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
