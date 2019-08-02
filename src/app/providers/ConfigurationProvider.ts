import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable({
  providedIn: 'root'
})

export class ConfigurationProvider {

  private path: string = 'configuration'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  get() {
    return this.ApiProvider.get(this.path)
  }

  put(data) {
    return this.ApiProvider.put(this.path, data);
  }

}
