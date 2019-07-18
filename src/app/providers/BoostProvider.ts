import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable()
export class BoostProvider {

  private path: string = 'boost'
  private paths: string = 'boosts'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  getUserBoosts(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user/${skip}/${limit}`);
  }

  post(data) {
    return this.ApiProvider.post(this.path, data);
  }

  put(projectId, data) {
    return this.ApiProvider.put(this.path, {
      projectId,
      data: data
    });
  }

}
