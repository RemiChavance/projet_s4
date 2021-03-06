// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Custom
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

// Comments
import { ListGroupComponent } from './group/list-group/list-group.component';
import { CommentComponent } from './comment/comment.component';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';
import { CommentCreationService } from './services/comment-creation.service';

// Recipes
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeManagerService } from './services/recipe-manager.service';
import { ListRecipeComponent } from './recipe/list-recipe/list-recipe.component';
import { CreateRecipeComponent } from './recipe/create-recipe/create-recipe.component';
import { RateComponent } from './recipe/rate/rate.component';
import { RateService } from './services/rate.service';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { GroupSubscriptionService } from './services/group-subscription.service';
import { GroupGuardService } from './services/group-guard.service';
import { FavoriteComponent } from './recipe/favorite/favorite.component';
import { FavoriteService } from './services/favorite.service';
import { ImageComponent } from './recipe/image/image.component';
import { ImageService } from './services/image.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'group/create-group', canActivate: [AuthGuardService], component: CreateGroupComponent },
  { path: 'group/:id', canActivate:[GroupGuardService], component: GroupComponent },
  { path: 'group/:id/admin', canActivate: [GroupAdminGuardService], component: AdminGroupComponent },
  { path: 'group/:id/recipe/:idRecipe', component: RecipeComponent },
  { path: 'group/:id/create-recipe', component: CreateRecipeComponent },
  { path: 'user/:idUser', canActivate: [AuthGuardService], component: UserProfilComponent },
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
    ListRecipeComponent,
    RateComponent,
    UserProfilComponent,
    FavoriteComponent,
    ImageComponent
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
    MatMenuModule,
    MatTableModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    GroupCreationService,
    GroupManagerService,
    GroupAdminGuardService,
    GroupSubscriptionService,
    GroupGuardService,
    RecipeManagerService,
    CommentCreationService,
    RateService,
    FavoriteService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
