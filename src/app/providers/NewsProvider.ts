import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { MapProvider } from './MapProvider';
import { ApiProvider } from './ApiProvider';
import { NewModel } from '../models/NewModel';

@Injectable({
    providedIn: 'root'
})

export class NewsProvider {

    private path: string = 'new'
    private paths: string = 'news'

    constructor(
        private ApiProvider: ApiProvider,
        private MapProvider: MapProvider
    ) { }

    get() {
        return this.ApiProvider.get(`${this.paths}`)
            .pipe(map((res: any) => {
                const news = res.result.map((item) => {
                    return new NewModel(item)
                });
                this.MapProvider.set(this.MapProvider.NEWS, news);
                return news;
            }))
    }

}
