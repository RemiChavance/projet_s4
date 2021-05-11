import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { RecipeManagerService } from 'src/app/services/recipe-manager.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() idRecipe: string;
  @Input() photos: string[];

  uploading: boolean = false;
  uploaded: boolean = false;

  constructor(private imageService: ImageService,
              private recipeManagerService: RecipeManagerService) { }

  ngOnInit(): void {
  }

  detectFiles(event) {
    this.uploaded = false;
    this.onUpdateFile(event.target.files[0]);
  }

  onUpdateFile(file: File) {
    this.uploading = true;
    this.imageService.uploadFile(file, this.idRecipe).then(
      () => {
        this.uploading = false;
        this.uploaded = true;
        this.recipeManagerService.refreshRecipe();
      }
    );
  }

}
