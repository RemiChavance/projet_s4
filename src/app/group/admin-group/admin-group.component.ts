import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { GroupAdminService } from 'src/app/services/group-admin.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {

  group: Group;
  user: User;

  nbComments: number = 0;

  constructor(private groupAdminService: GroupAdminService) { }

  ngOnInit() {
    this.user = this.groupAdminService.user;
    this.group = this.groupAdminService.group;

    /*if(this.group && this.group.recipes) {
      this.group.recipes.forEach(recipe => {
        if(recipe.comments) {
          this.nbComments = recipe.comments.length;
        }
      });
    }*/
  }
}