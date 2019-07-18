import { Injectable, EventEmitter, Output } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { Web3Provider } from './Web3Provider';

@Injectable()
export class AccountProvider {

  timer;
  
  private balance = 0;
  private ethBalance = 0;
  private path: string = 'account'
  private paths: string = 'accounts'

  @Output('change') change = new EventEmitter();
  @Output('ethChange') ethChange = new EventEmitter();

  constructor(
    private ApiProvider: ApiProvider,
    private Web3Provider: Web3Provider
  ) { }

  post(data) {
    return this.ApiProvider.post(this.path, data);
  }

  getUserAccounts(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user/${skip}/${limit}`);
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

  setBalance() {

    this.balance = 0;

    return this.getAllUserAccounts().toPromise().then((res) => {
      if (res.result) {

        let result = res.result.map((item) => {
          return this.Web3Provider.getBalance(item.address);
        });

        return Promise.all(result);

      }
    }).then((balances) => {

      if (balances) {
        balances.forEach((b) => {
          this.balance += Number(b);
        });

        this.change.emit(this.balance);
      }

    });
  }

  setEthBalance() {

    this.ethBalance = 0;

    this.getAllUserAccounts().toPromise().then((res) => {
      if (res.result) {


        let result = res.result.map((item) => {
          return this.Web3Provider.getEthBalance(item.address);
        });

        return Promise.all(result);

      }
    }).then((balances) => {

      if (balances) {
        balances.forEach((b) => {
          this.ethBalance += Number(b);
        });

        this.ethChange.emit(this.ethBalance);
      }

    });

  }

  syncBalance() {

    this.removeSyncBalance()

    this.timer = setInterval(() => {
      this.resetBalance();
    }, 1000*60);

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
    this.setBalance();
    this.setEthBalance();
  }


}
