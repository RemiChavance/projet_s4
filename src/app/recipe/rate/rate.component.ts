import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rate } from 'src/app/models/rate.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RateService } from 'src/app/services/rate.service';
import { RecipeManagerService } from 'src/app/services/recipe-manager.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit, OnDestroy {

  @Input() idRecipe: string;
  @Input() rates: Rate[];

  rateIndex: number = -1;
  hasRated: boolean = false;

  moyenne: number = 0;
  
  user: User;
  userSubscription: Subscription;

  star1: string = "star_border";
  star2: string = "star_border";
  star3: string = "star_border";
  star4: string = "star_border";
  star5: string = "star_border";


  constructor(private rateService: RateService,
              private recipeManagerService: RecipeManagerService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        if(user) {
          this.hasAlreadyRated();
        }
      }
    );
  }


  /**
   * Check if current user has already rated the recipe
   */
  hasAlreadyRated() {
    if(this.rates) {
      this.rates.forEach(rate => {
        if(rate.idAuthor == this.user.id) {
          this.hasRated = true;
          this.rateIndex = rate.idRate;
        }
      });

      if(this.hasRated) {
        this.displayRatingUser(this.rates[this.rateIndex].description); 
      }
    }
  }


  onMouseClick(nbStar: number) {
    if(this.user) {
      if(this.hasRated) {
        this.rates[this.rateIndex].description = nbStar; // change rating
        this.rateService.repostRate(this.rates[this.rateIndex], this.idRecipe).then( // send repost
          () => {
            this.recipeManagerService.refreshRecipe();
          }
        ); 
      } else {
        this.rateService.postNewRate(nbStar, this.idRecipe, this.user.id).then( // send post
          () => {
            this.recipeManagerService.refreshRecipe();
            this.displayRatingUser(nbStar);
            this.rates = [];
            this.rateIndex = this.rates.length;
            this.rates.push(new Rate(this.rateIndex, nbStar, this.user.id));
            this.hasRated = true;
          }
        );
      }
    } else {
      this.router.navigate(['/auth', 'signin']);
    }
    
  }
  
  onMouseOver(nbStar: number) {
    this.displayRatingUser(nbStar);
  }

  onMouseOut() {
    if(this.hasRated) {
      this.displayRatingUser(this.rates[this.rateIndex].description);
    } else {
      this.star1 = "star_border";
      this.star2 = "star_border";
      this.star3 = "star_border";
      this.star4 = "star_border";
      this.star5 = "star_border";
    }
  }

  /**
   * Display correct stars by rating given
   * @param rateNumber 
   */
  displayRatingUser(rateNumber: number) {
    switch(rateNumber) {
      case 1: {
        this.star1 = "star";
        this.star2 = "star_border";
        this.star3 = "star_border";
        this.star4 = "star_border";
        this.star5 = "star_border";
        break;
      }
      case 2: {
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star_border";
        this.star4 = "star_border";
        this.star5 = "star_border";
        break;
      }
      case 3: {
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star";
        this.star4 = "star_border";
        this.star5 = "star_border";
        break;
      }
      case 4: {
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star";
        this.star4 = "star";
        this.star5 = "star_border";
        break;
      }
      case 5: {
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star";
        this.star4 = "star";
        this.star5 = "star";
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
