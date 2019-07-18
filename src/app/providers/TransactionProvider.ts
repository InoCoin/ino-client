import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable()
export class TransactionProvider {

  private path: string = 'transaction'
  private paths: string = 'transactions'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  post(data) {
    return this.ApiProvider.post(this.path, data);
  }

  getUserTransactons(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user/${skip}/${limit}`);
  }

  getUserInTransactons(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user-in/${skip}/${limit}`);
  }

  getUserOutTransactons(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user-out/${skip}/${limit}`);
  }

}
