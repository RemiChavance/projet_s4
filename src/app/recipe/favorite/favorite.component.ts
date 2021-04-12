import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  @Input() idRecipe: string;

  user: User;
  userSubscription: Subscription;

  isFavorite: string = "favorite_border";


  constructor(private authService: AuthService,
              private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        if(user) {
          this.isAlreadyFavorite();
        }
      }
    );
  }

  /**
   * Check if current user has already the recipe in favorite
   */
  isAlreadyFavorite() {
    if(this.user.favorites && this.user.favorites.includes(this.idRecipe)) {
      this.isFavorite = "favorite";
    }
  }

  onClickFavorite (){
    if(this.isFavorite === "favorite") {
      let indexToRemove = this.user.favorites.indexOf(this.idRecipe);
      if(indexToRemove != -1) {
        this.user.favorites.splice(indexToRemove, 1);
        this.favoriteService.deleteFavorite(this.user.favorites, this.user.id).then(
          () => {
            this.isFavorite = "favorite_border";
          }
        );
      } else {
        console.error("favorite.components.ts --> this isn't suppose to happened");
      }
    } else {
      this.favoriteService.postNewFavorite(this.idRecipe, this.user.id).then(
        () => {
          this.isFavorite = "favorite";
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
