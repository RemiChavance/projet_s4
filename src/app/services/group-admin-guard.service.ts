import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupAdminService } from './group-admin.service';

@Injectable({
  providedIn: 'root'
})
export class GroupAdminGuardService implements CanActivate {


  constructor(private router: Router,
              private groupAdminService: GroupAdminService) { }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        if (this.groupAdminService.user === undefined || this.groupAdminService.group === undefined) {
          this.router.navigate(['/home']);
          resolve(false);
        } else if (this.groupAdminService.user.id === this.groupAdminService.group.adminId) {
          resolve(true);
        } else {
          this.router.navigate(['/group', this.groupAdminService.group.idGroup]);
          resolve(false);
        }
      }
    );
  }
}
