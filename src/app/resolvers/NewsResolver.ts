import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsProvider, MapProvider } from '../providers';

@Injectable({ providedIn: 'root' })

export class NewsResolver implements Resolve<any> {

  constructor(
    private NewsProvider: NewsProvider,
    private MapProvider: MapProvider
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const news = this.MapProvider.get(this.MapProvider.NEWS);
    if (news) {
      return news;
    }
    return this.NewsProvider.get();
  }

}
