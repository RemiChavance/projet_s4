import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupAdminService } from './group-admin.service';

@Injectable({
  providedIn: 'root'
})
export class GroupAdminGuardService implements CanActivate {


  constructor(private route: ActivatedRoute,
              private groupAdminService: GroupAdminService) { }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        if(this.groupAdminService.user === undefined || this.groupAdminService.group === undefined) {
          resolve(false);
        } else if(this.groupAdminService.user.id == this.groupAdminService.group.adminId) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );   
  }
}
