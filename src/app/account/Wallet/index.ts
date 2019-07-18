import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material';

import { BoostProvider, SocketProvider, AccountProvider, TransactionProvider, Web3Provider, ConfigurationProvider, ApiProvider } from '../../providers';
import { AccountDialog } from '../../shared/account-dialog/account.component';
import { NewAccountDialog } from '../../shared/account-new-dialog/account.component';

import { ScanTx, CoinLibAPI, CoinLibKey, Coin, Currency } from '../../../globals/config';

@Component({
  selector: 'wallet',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Wallet implements OnInit, OnDestroy {

  loaded;
  price;
  subscribe;
  configuration;
  boost;
  account;
  deleteAcc;
  inTransaction;
  outTransaction;
  ethChange;
  changePrice;

  limit = 4;
  skip = 0;
  accounts = [];

  intloaded;
  intlimit = 5;
  intskip = 0;
  intransactions = [];

  outloaded;
  outtlimit = 5;
  outtskip = 0;
  outtransactions = [];

  bloaded;
  blimit = 5;
  bskip = 0;
  boosts = [];

  scanTx = ScanTx;
  balance = 0;
  ethBalance = 0;

  constructor(
    private MatDialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef,
    private AccountProvider: AccountProvider,
    private ApiProvider: ApiProvider,
    private BoostProvider: BoostProvider,
    private TransactionProvider: TransactionProvider,
    private Web3Provider: Web3Provider,
    private ConfigurationProvider: ConfigurationProvider,
    private SocketProvider: SocketProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {

    this.balance = this.AccountProvider.getBalance();
    this.ethBalance = this.AccountProvider.getEthBalance();

    this.setPrice();
    this.onLoadAccounts();
    this.onLoadBoosts();
    this.onLoadInTrasactions();
    this.onLoadOutTrasactions();

    this.changePrice = setInterval(() => {
      this.setPrice();
    }, 1000*60*5);

    this.ConfigurationProvider.get().subscribe((res) => {
      if (res.result) {
        this.configuration = res.result;
        this.ChangeDetectorRef.markForCheck();
      }
    })

    if (isPlatformBrowser(this.platformId)) {

      this.ethChange = this.AccountProvider.ethChange.subscribe((res) => {
        this.ethBalance = res;
        this.ChangeDetectorRef.markForCheck();
      })

      this.subscribe = this.AccountProvider.change.subscribe((res) => {
        this.balance = res;
        this.ChangeDetectorRef.markForCheck();
      })

      this.boost = this.SocketProvider.receiveBoost.subscribe((data) => {
        this.boosts.unshift(data);
        this.bskip++;
        this.ChangeDetectorRef.markForCheck();
      })

      this.account = this.SocketProvider.receiveAccount.subscribe((data) => {
        this.skip++;
        this.accounts.unshift(data);
        this.ChangeDetectorRef.markForCheck();
      })

      this.inTransaction = this.SocketProvider.inTrancation.subscribe((data) => {
        this.intskip++;
        this.intransactions.unshift(data);
        this.ChangeDetectorRef.markForCheck();
      })

      this.outTransaction = this.SocketProvider.outTrancation.subscribe((data) => {
        this.outtskip++;
        this.outtransactions.unshift(data);
        this.ChangeDetectorRef.markForCheck();
      })

      this.deleteAcc = this.SocketProvider.deleteAccount.subscribe((data) => {
        for (let i = 0; i < this.accounts.length; i++) {
          if (data._id == this.accounts[i]._id) {
            this.accounts.splice(i, 1);
            this.skip--;
            this.AccountProvider.resetBalance();
            this.ChangeDetectorRef.markForCheck();
          }
        }
      })
    }

  }

  setPrice(){
    this.ApiProvider.getExternal(`${CoinLibAPI}?key=${CoinLibKey}&pref=${Currency}&symbol=${Coin}`).subscribe((res) => {
      this.price = res.price;
      this.ChangeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.changePrice) {
      clearInterval(this.changePrice);
    }
    if (isPlatformBrowser(this.platformId) && this.ethChange) {
      this.ethChange.unsubscribe();
    }
    if (isPlatformBrowser(this.platformId) && this.subscribe) {
      this.subscribe.unsubscribe();
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

  onLoadBoosts() {
    if (!this.bloaded) {
      this.BoostProvider.getUserBoosts(this.bskip, this.blimit).subscribe((res: any) => {

        if (res.result) {

          this.bskip += this.blimit;

          if (res.result.length < this.blimit) {
            this.bloaded = true;
          } else {
            this.bloaded = false;
          }

          res.result.forEach((a) => {
            this.boosts.push(a);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

  onLoadAccounts() {
    if (!this.loaded) {
      this.AccountProvider.getUserAccounts(this.skip, this.limit).subscribe((res: any) => {
        if (res.result) {

          this.skip += this.limit;

          if (res.result.length < this.limit) {
            this.loaded = true;
          } else {
            this.loaded = false;
          }

          res.result.forEach((a) => {
            this.accounts.push(a);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

  onLoadInTrasactions() {
    if (!this.intloaded) {
      this.TransactionProvider.getUserInTransactons(this.intskip, this.intlimit).subscribe((res: any) => {
        if (res.result) {

          this.intskip += this.intlimit;

          if (res.result.length < this.intlimit) {
            this.intloaded = true;
          } else {
            this.intloaded = false;
          }

          res.result.forEach((a) => {
            this.intransactions.push(a);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

  onLoadOutTrasactions() {
    if (!this.outloaded) {
      this.TransactionProvider.getUserOutTransactons(this.outtskip, this.outtlimit).subscribe((res: any) => {
        if (res.result) {

          this.outtskip += this.outtlimit;

          if (res.result.length < this.outtlimit) {
            this.outloaded = true;
          } else {
            this.outloaded = false;
          }

          res.result.forEach((a) => {
            this.outtransactions.push(a);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }


  onAddAccount() {

    let dialogRef = this.MatDialog.open(AccountDialog, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        let keystore = JSON.parse(result.keyStore);
        result.address = '0x' + keystore.address;
        result.keyStore = keystore;

        this.AccountProvider.post(result).subscribe((res: any) => {
          if (res.result) {

          }
        })

      }
    });

  }

  onAddNewAccount() {

    let dialogRef = this.MatDialog.open(NewAccountDialog, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        let account = this.Web3Provider.createAccount()

        result.address = account.address;

        this.Web3Provider.exportKeyStore(account.privateKey, result.password).then((kStore) => {

          result.keyStore = kStore;

          this.AccountProvider.post(result).subscribe((res: any) => {
            if (res.result) {
              this.generateFile(result)
            }
          })

        }).catch((e) => {
          console.log(e)
        })

      }
    });

  }

  generateFile(data) {
    let element = document.createElement('a');

    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data.keyStore)));
    element.setAttribute('download', `0x${data.keyStore.address}.json`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  onDelete(index: number) {
    this.AccountProvider.put(this.accounts[index]._id, {
      active: false
    }).subscribe((res: any) => {
      if (res.result) {

      }
    });
  }

}
