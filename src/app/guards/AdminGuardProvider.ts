import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserProvider } from '../providers/UserProvider';
import { UserRoles } from '../../globals/config';

@Injectable({
  providedIn: 'root'
})

export class AdminGuardProvider implements CanActivate {

  constructor(
    private UserProvider: UserProvider,
    private Router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.UserProvider.getUser().pipe(map((res: any) => {

      if (res.error) {
        this.Router.navigate(['/account', 'login']);
        return false;
      }

      if (res.result.role == UserRoles.admin) {
        return true;
      }

      this.Router.navigate(['/']);
      return false;

    }));

  }

}
