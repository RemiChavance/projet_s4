import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupManagerService } from 'src/app/services/group-manager.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {

  groups: Group[] = [];

  constructor(private groupManagerService: GroupManagerService,
              private router: Router) { }

  ngOnInit(): void {
    this.groupManagerService.getAllGroups().then(
      (data) => {
        this.groups = data;
      }
    );
  }

  onClickGroup(idGroup: number) {

  }

}