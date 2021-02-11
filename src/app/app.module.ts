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


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'group/create-group', component: CreateGroupComponent },
  { path: 'group/:id', component: GroupComponent },
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
    GroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    GroupCreationService,
    GroupManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
