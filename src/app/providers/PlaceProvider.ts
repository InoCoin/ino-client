import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable()
export class PlaceProvider {

  private path: string = 'place'
  private paths: string = 'places'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  getAdmin(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/admin/${skip}/${limit}`);
  }

  post(data) {
    return this.ApiProvider.post(this.path, data);
  }

  put(placeId, data) {
    return this.ApiProvider.put(this.path, {
      placeId,
      data: data
    });
  }

}
