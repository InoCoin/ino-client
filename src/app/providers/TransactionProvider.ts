import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiProvider } from './ApiProvider';

@Injectable({
  providedIn: 'root'
})

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
    return this.ApiProvider.get(`${this.paths}/user/${skip}/${limit}`).pipe(map((res: any) => {
      if (res.result) {
        return res.result;
      }
      return [];
    }));
  }

  getUserInTransactons(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user-in/${skip}/${limit}`).pipe(map((res: any) => {
      if (res.result) {
        return res.result;
      }
      return [];
    }));
  }

  getUserOutTransactons(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user-out/${skip}/${limit}`).pipe(map((res: any) => {
      if (res.result) {
        return res.result;
      }
      return [];
    }));
  }

}
