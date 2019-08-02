import { Injectable, EventEmitter, Output, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';

import { ApiProvider } from './ApiProvider';
import { Web3Provider } from './Web3Provider';

@Injectable({
  providedIn: 'root'
})

export class AccountProvider {

  timer;

  private balance: number = 0;
  private ethBalance = 0;
  private path: string = 'account'
  private paths: string = 'accounts'

  @Output('change') change = new EventEmitter();

  constructor(
    private NgZone: NgZone,
    private ApiProvider: ApiProvider,
    private Web3Provider: Web3Provider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  private setBalance() {
    return this.getAllUserAccounts().toPromise().then((res: any) => {
      if (res.result) {

        let result = res.result.map((item) => {
          return this.Web3Provider.getBalance(item.address);
        });


        let resultETH = res.result.map((item) => {
          return this.Web3Provider.getEthBalance(item.address);
        });

        return Promise.all([
          Promise.all(result),
          Promise.all(resultETH)
        ]);

      }

      return Promise.reject('No accounts');
    }).then(([balance, ethBalance]) => {

      this.balance = balance.reduce<number>((price: number, value: string) => {
        return price + Number(value);
      }, 0);

      this.ethBalance = ethBalance.reduce<number>((price: number, value: string) => {
        return price + Number(value);
      }, 0);

      this.change.emit({
        balance: this.balance,
        ethBalance: this.ethBalance
      });

    });
  }

  post(data) {
    return this.ApiProvider.post(this.path, data);
  }

  getUserAccounts(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user/${skip}/${limit}`).pipe(map((res: any) => {
      if(res.result){
        return res.result;
      }
      return [];
    }));
  }

  getAllUserAccounts() {
    return this.ApiProvider.get(`${this.paths}/user/all`);
  }

  put(accountId, data) {
    return this.ApiProvider.put(this.path, {
      accountId,
      data: data
    });
  }

  syncBalance() {
    if (isPlatformBrowser(this.platformId)) {
      this.removeSyncBalance();
      this.NgZone.runOutsideAngular(() => {
        this.timer = setInterval(() => {
          this.resetBalance();
        }, 1000 * 60);
      });
    }
  }

  removeSyncBalance() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getBalance() {
    return this.balance;
  }

  getEthBalance() {
    return this.ethBalance;
  }

  resetBalance() {
    this.setBalance().catch((e) => {
      console.log(e);
    });
  }

}
