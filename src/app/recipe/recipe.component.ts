import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeManagerService } from '../services/recipe-manager.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe;

  fullStars: number[] = [];
  emptyStars: number[] = [];
  moyenne: number = 0;

  constructor(private route: ActivatedRoute,
              private recipeManagerService: RecipeManagerService,
              private router: Router) { }

  ngOnInit(): void {
    this.recipeManagerService.currentRecipe.subscribe(
      (recipe) => {
        this.recipe = recipe;
        this.initRating();
      }
    );
    this.recipeManagerService.getRecipeById(this.route.snapshot.params['idRecipe']).then();
  }


  initRating() {
    this.emptyStars = [];
    this.fullStars = [];
    this.moyenne = 0;

    if(this.recipe && this.recipe.rates) {
      let nbRate: number = this.recipe.rates.length;
      this.recipe.rates.forEach(rate => {
        this.moyenne = this.moyenne + rate.description;
      });

      // Calcul de la moyenne
      this.moyenne = this.moyenne / nbRate;
      let moyStars = Math.round(this.moyenne);

      // Affichage des étoiles
      for(let i=0; i<moyStars; i++) {
        this.fullStars.push(1);
      }
      for(let i=0; i<(5-moyStars); i++) {
        this.emptyStars.push(1);
      }
    } else {
      for(let i=0; i<5; i++) {
        this.emptyStars.push(1);
      }
    }
  }

  onBack() {
    this.router.navigate(['/group', this.recipe.idGroup]);
  }

  onSave() {
    var data = document.getElementById('contentToConvert');
    data.style.color = 'black'; // for pdf visibility
    html2canvas(data).then(
      canvas => {
        data.style.color = 'white'; // back to web visibility
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 1000;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('portrait', 'mm', 'a4'); // A4 size page of PDF
        pdf.addImage(contentDataURL, 'PNG', 0, 10, imgWidth, imgHeight)
        pdf.save(this.recipe.title + '.pdf'); // Generated PDF
      }
    );
  }
}
