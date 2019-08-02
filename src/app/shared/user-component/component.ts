import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserRoles } from '../../../globals/config';
import { UserProvider } from '../../providers';

@Component({
  selector: 'user-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class User {

  @Input('user') user;
  roles = Object.keys(UserRoles);
  userRoles = UserRoles;

  constructor(
    private UserProvider: UserProvider
  ) { }

  onChange(event) {
    this.UserProvider.putAdmin(this.user._id, {
      role: event.value
    }).subscribe();
  }

}
