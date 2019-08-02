import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { forkJoin, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Web3Provider, AccountProvider } from 'src/app/providers';
import { KeystoreDialog } from '../keystore-dialog';
import { SendDialog } from '../send-dialog';
import { ConfirmDialog } from '../confirm-dialog';
import { BuyCryptoDialog } from '../buy-crypto-dialog';

@Component({
  selector: 'wallet-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletComponent implements OnInit {

  @Input('data') data;
  balance = 0;
  ethBalance = 0;

  constructor(
    private Web3Provider: Web3Provider,
    private AccountProvider: AccountProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatDialog: MatDialog
  ) { }

  ngOnInit() {
    const address = this.data.address;
    forkJoin([
      this.Web3Provider.getBalance(address),
      this.Web3Provider.getEthBalance(address)
    ]).subscribe(([balance, ethBalance]) => {
      this.balance = balance;
      this.ethBalance = ethBalance;
      this.ChangeDetectorRef.markForCheck();
    });
  }

  exportPrivateKey() {
    this.MatDialog.open(KeystoreDialog, {
      autoFocus: false,
      data: {
        keyStore: this.data.keyStore,
      }
    });
  }

  sendINO() {
    let dialogRef = this.MatDialog.open(SendDialog, {
      data: this.data
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res != null) {

      }
    });
  }

  onDelete() {

    let dialogRef = this.MatDialog.open(ConfirmDialog, {
      width: '350px'
    });

    dialogRef.afterClosed().pipe(flatMap((result) => {
      if (result) {
        return this.AccountProvider.put(this.data._id, {
          active: false
        });
      }
      return of(false);
    })).subscribe();

  }

  buy() {

    this.MatDialog.open(BuyCryptoDialog, {
      data: {
        account: this.data
      }
    });

  }

}
