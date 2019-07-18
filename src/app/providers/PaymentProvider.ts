import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable()
export class PaymentProvider {

  private path: string = 'payment'
  private paths: string = 'payments'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  getAdmin(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/admin/${skip}/${limit}`);
  }

  post(data) {
    return this.ApiProvider.post(this.path, data);
  }

  buyByEther(data) {
    return this.ApiProvider.post(`${this.path}/crypto/ether`, data);
  }

  buyByBitcoin(data) {
    return this.ApiProvider.post(`${this.path}/crypto/bitcoin`, data);
  }

  put(paymentId, data) {
    return this.ApiProvider.put(this.path, {
      paymentId,
      data: data
    });
  }

}
