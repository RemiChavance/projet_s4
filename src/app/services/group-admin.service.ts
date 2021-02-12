import { Injectable } from '@angular/core';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupAdminService {

  user: User;
  group: Group;

  constructor() { }
}
