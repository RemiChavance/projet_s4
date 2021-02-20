import { Component, Input, OnInit } from '@angular/core';
import { GroupManagerService } from 'src/app/services/group-manager.service';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  @Input() idGroup: number;
  @Input() idRecipe: number;

  moyenne: number = 0;

  star1: string = "star_border";
  star2: string = "star_border";
  star3: string = "star_border";
  star4: string = "star_border";
  star5: string = "star_border";


  constructor(private rateService: RateService,
              private groupManagerService: GroupManagerService) { }

  ngOnInit(): void {
  }


  onMouseClick(nbStar: number) {
    this.rateService.postRate(nbStar, this.idGroup, this.idRecipe).then(
      () => {
        this.groupManagerService.refreshGroup();
      }
    );
  }
  
  onMouseOver(nbStar: number) {
    switch(nbStar) {
      case 1: {
        this.star1 = "star";
        break;
      }
      case 2: {
        this.star1 = "star";
        this.star2 = "star";
        break;
      }
      case 3: {
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star";
        break;
      }
      case 4: {
        this.star1 = "star";
        this.star2 = "star";
        this.star3 = "star";
        this.star4 = "star";
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

  onMouseOut() {
    this.star1 = "star_border";
    this.star2 = "star_border";
    this.star3 = "star_border";
    this.star4 = "star_border";
    this.star5 = "star_border";
  }
}
