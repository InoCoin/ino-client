import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserProvider } from '../providers/UserProvider';

@Injectable({
  providedIn: 'root'
})

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
        this.Router.navigateByUrl('/user/login');
        return false;
      }

      return true;
    }));

  }

}
