import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserProvider } from './UserProvider';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()

export class AuthGuardProvider implements CanActivate {

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

      return true;
    }));

  }

}