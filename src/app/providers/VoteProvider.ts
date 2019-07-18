import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable()
export class VoteProvider {

  private path: string = 'vote'
  private paths: string = 'votes'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  post(data) {
    return this.ApiProvider.post(this.path, data);
  }

  delete(projectId) {
    return this.ApiProvider.delete(`${this.path}/${projectId}`);
  }

}
