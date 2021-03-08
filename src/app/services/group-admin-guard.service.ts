import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { GroupManagerService } from './group-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GroupAdminGuardService implements CanActivate {

  constructor(private router: Router,
              private groupManagerService: GroupManagerService,
              private authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        this.groupManagerService.currentGroup.subscribe(
          (group) => {
            this.authService.currentUser.subscribe(
              (user) => {
                if (group.adminId === undefined || user.id === undefined) {
                  this.router.navigate(['/home']);
                  resolve(false);
                } else if (group.adminId === user.id) {
                  resolve(true);
                } else {
                  this.router.navigate(['/group', group.idGroup]);
                  resolve(false);
                }
              }
            );
          }
        );
      }
    );
  }
}
