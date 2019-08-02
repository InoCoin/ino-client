import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';

import { AccountProvider, TransactionProvider, BoostProvider, SocketProvider, ApiProvider } from 'src/app/providers';
import { Environment, CoinLibAPI, Coin } from 'src/globals/config';
import { ExistingAccountDialog } from 'src/app/shared/existing-account-dialog';
import { NewAccountDialog } from 'src/app/shared/new-account-dialog';
import { CoinLibKey, Currency } from 'src/globals/config';

@Component({
  selector: 'wallets-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletsComponent implements OnInit, OnDestroy {

  coinlib;
  balance;
  ethBalance;
  changeBalance;
  boost;
  account;
  deleteAcc;
  inTransaction;
  outTransaction;
  changePrice;

  api_url = Environment.api_url;

  limitAcc = 3;
  skipAcc = 3;
  accounts = [];
  loadedAccounts = false;

  loadedIn = false;
  limitIn = 3;
  skipIn = 3;
  transactionsIn = [];

  loadedOut = false;
  limitOut = 3;
  skipOut = 3;
  transactionsOut = [];

  loadedBo = false;
  limitBo = 2;
  skipBo = 2;
  boosts = [];

  constructor(
    ActivatedRoute: ActivatedRoute,
    private ApiProvider: ApiProvider,
    private AccountProvider: AccountProvider,
    private TransactionProvider: TransactionProvider,
    private SocketProvider: SocketProvider,
    private BoostProvider: BoostProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatDialog: MatDialog,
    private NgZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const [coinlib, accounts, transactionsIn, transactionsOut, boosts] = ActivatedRoute.snapshot.data.result;

    this.coinlib = coinlib;
    this.accounts = accounts;
    this.transactionsIn = transactionsIn;
    this.transactionsOut = transactionsOut;
    this.boosts = boosts;

    this.balance = this.AccountProvider.getBalance();
    this.ethBalance = this.AccountProvider.getEthBalance();

    if (accounts.length < this.limitAcc) {
      this.loadedAccounts = true;
    }

    if (transactionsIn.length < this.limitIn) {
      this.loadedIn = true;
    }

    if (transactionsOut.length < this.limitIn) {
      this.loadedOut = true;
    }

    if (boosts.length < this.limitBo) {
      this.loadedBo = true;
    }

  }

  ngOnInit() {

    this.changeBalance = this.AccountProvider.change.subscribe(({ balance, ethBalance }) => {
      this.balance = balance;
      this.ethBalance = ethBalance;
      this.ChangeDetectorRef.markForCheck();
    });


    if (isPlatformBrowser(this.platformId)) {

      this.NgZone.runOutsideAngular(() => {
        this.changePrice = setInterval(() => {
          this.setPrice();
        }, 1000 * 60 * 5);
      });

      this.boost = this.SocketProvider.receiveBoost.subscribe((data) => {
        this.boosts.unshift(data);
        this.skipBo++;
        this.ChangeDetectorRef.markForCheck();
      })

      this.account = this.SocketProvider.receiveAccount.subscribe((data) => {
        this.skipAcc++;
        this.accounts.unshift(data);
        this.ChangeDetectorRef.markForCheck();
      })

      this.inTransaction = this.SocketProvider.inTrancation.subscribe((data) => {
        this.skipIn++;
        this.transactionsIn.unshift(data);
        this.ChangeDetectorRef.markForCheck();
      })

      this.outTransaction = this.SocketProvider.outTrancation.subscribe((data) => {
        this.skipOut++;
        this.transactionsOut.unshift(data);
        this.ChangeDetectorRef.markForCheck();
      })

      this.deleteAcc = this.SocketProvider.deleteAccount.subscribe((data) => {
        for (let i = 0; i < this.accounts.length; i++) {
          if (data._id == this.accounts[i]._id) {
            this.accounts.splice(i, 1);
            this.skipAcc--;
            this.AccountProvider.resetBalance();
            this.ChangeDetectorRef.markForCheck();
          }
        }
      });
    }
  }

  ngOnDestroy() {
    
    if (this.changeBalance) {
      this.changeBalance.unsubscribe();
    }

    if (isPlatformBrowser(this.platformId) && this.changePrice) {
      clearInterval(this.changePrice);
    }

    if (isPlatformBrowser(this.platformId) && this.boost) {
      this.boost.unsubscribe();
    }

    if (isPlatformBrowser(this.platformId) && this.account) {
      this.account.unsubscribe();
    }

    if (isPlatformBrowser(this.platformId) && this.inTransaction) {
      this.inTransaction.unsubscribe();
    }

    if (isPlatformBrowser(this.platformId) && this.outTransaction) {
      this.outTransaction.unsubscribe();
    }

    if (isPlatformBrowser(this.platformId) && this.deleteAcc) {
      this.deleteAcc.unsubscribe();
    }

  }

  addExistingAccount() {
    this.MatDialog.open(ExistingAccountDialog);
  }

  addNewAccount() {
    this.MatDialog.open(NewAccountDialog);
  }

  trackByFn(index, item) {
    return item._id;
  }


  showMoreAccounts() {
    if (!this.loadedAccounts) {
      this.AccountProvider.getUserAccounts(this.skipAcc, this.limitAcc).subscribe((data) => {

        this.skipAcc += this.limitAcc;

        if (data.length < this.limitOut) {
          this.loadedAccounts = true;
        }

        data.forEach((a) => {
          this.accounts.push(a);
        });

        this.ChangeDetectorRef.markForCheck();

      });
    }
  }

  showMoreInTransactions() {
    if (!this.loadedIn) {
      this.TransactionProvider.getUserInTransactons(this.skipIn, this.limitIn).subscribe((data) => {

        this.skipIn += this.limitIn;

        if (data.length < this.limitIn) {
          this.loadedIn = true;
        }

        data.forEach((a) => {
          this.transactionsIn.push(a);
        });

        this.ChangeDetectorRef.markForCheck();

      });
    }
  }

  showMoreOutTransactions() {
    if (!this.loadedOut) {
      this.TransactionProvider.getUserOutTransactons(this.skipOut, this.limitOut).subscribe((data) => {

        this.skipOut += this.limitOut;

        if (data.length < this.limitOut) {
          this.loadedOut = true;
        }

        data.forEach((a) => {
          this.transactionsOut.push(a);
        });

        this.ChangeDetectorRef.markForCheck();

      });
    }
  }

  showMoreBoosts() {
    if (!this.loadedBo) {
      this.BoostProvider.getUserBoosts(this.skipBo, this.limitBo).subscribe((data) => {

        this.skipBo += this.limitBo;

        if (data.length < this.limitBo) {
          this.loadedBo = true;
        }

        data.forEach((a) => {
          this.boosts.push(a);
        });

        this.ChangeDetectorRef.markForCheck();

      });
    }
  }

  setPrice() {
    this.ApiProvider.getExternal(`${CoinLibAPI}?key=${CoinLibKey}&pref=${Currency}&symbol=${Coin}`).subscribe((res) => {
      this.coinlib = res;
      this.ChangeDetectorRef.markForCheck();
    });
  }

}
