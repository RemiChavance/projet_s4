import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/group.model';
import { GroupManagerService } from '../services/group-manager.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;
  nonExistentGroup = false;

  constructor(private groupManagerService: GroupManagerService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.group = new Group('', null);
    this.groupManagerService.groupSubject.subscribe(
      (group) => {
        if(group) {
          this.group = group;
        } else {
          this.nonExistentGroup = true;
        }
        
      }
    );
    this.groupManagerService.getGroupeById(
      this.route.snapshot.params['id']
    );
}

}
