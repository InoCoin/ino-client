import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ApiProvider, AccountProvider, TransactionProvider, BoostProvider } from '../providers';
import { CoinLibAPI, CoinLibKey, Currency, Coin } from 'src/globals/config';

@Injectable({ providedIn: 'root' })

export class WalletsResolver implements Resolve<any> {

  constructor(
    private ApiProvider: ApiProvider,
    private AccountProvider: AccountProvider,
    private TransactionProvider: TransactionProvider,
    private BoostProvider: BoostProvider,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return forkJoin([
      this.ApiProvider.getExternal(`${CoinLibAPI}?key=${CoinLibKey}&pref=${Currency}&symbol=${Coin}`),
      this.AccountProvider.getUserAccounts(0, 3),
      this.TransactionProvider.getUserInTransactons(0, 3),
      this.TransactionProvider.getUserOutTransactons(0, 3),
      this.BoostProvider.getUserBoosts(0, 2)
    ]);
  }

}
