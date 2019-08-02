import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectProvider } from '../providers';

@Injectable({ providedIn: 'root' })

export class ProjectResolver implements Resolve<any> {

  constructor(private ProjectProvider: ProjectProvider) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.ProjectProvider.getById(route.params.key).pipe(map((res: any) => {

      if (res.result) {
        return res.result;
      }
      
      return false;
    }));
  }

}
