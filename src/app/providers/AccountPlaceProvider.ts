import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable()
export class AccountPlaceProvider {

  private path: string = 'account-place'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  getAdmin(skip, limit) {
    return this.ApiProvider.get(`${this.path}/admin/${skip}/${limit}`);
  }

  put(itemId, data) {
    return this.ApiProvider.put(this.path, {
      itemId,
      data: data
    });
  }

}
