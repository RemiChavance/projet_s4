import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { GroupComponent } from './group/group.component';
import { GroupCreationService } from './services/group-creation.service';
import { GroupManagerService } from './services/group-manager.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGroupComponent } from './group/admin-group/admin-group.component';
import { GroupAdminGuardService } from './services/group-admin-guard.service';
import { GroupAdminService } from './services/group-admin.service';
import { RecipeComponent } from './recipe/recipe.component';
import { CreateRecipeComponent } from './recipe/create-recipe/create-recipe.component';
import { ListGroupComponent } from './group/list-group/list-group.component';

import { MatStepperModule } from '@angular/material/stepper';

import { CommentComponent } from './comment/comment.component';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';
import { RecipeManagerService } from './services/recipe-manager.service';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'group/create-group', canActivate: [AuthGuardService], component: CreateGroupComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'group/:id/admin', canActivate: [GroupAdminGuardService], component: AdminGroupComponent },
  { path: 'group/:id/recipe/:idRecipe', component: RecipeComponent },
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
    CreateCommentComponent
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
    MatStepperModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    GroupCreationService,
    GroupManagerService,
    GroupAdminGuardService,
    GroupAdminService,
    RecipeManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
