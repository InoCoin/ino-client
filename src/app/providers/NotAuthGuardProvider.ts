import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserProvider } from './UserProvider';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()

export class NotAuthGuardProvider implements CanActivate {

  constructor(
    private UserProvider: UserProvider,
    private Router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.UserProvider.getUser().pipe(map((res: any) => {

      if (res.result) {
        this.Router.navigate(['/']);
        return false;
      }

      return true;

    }));

  }

}
