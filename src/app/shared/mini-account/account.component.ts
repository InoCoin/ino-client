import { Component, OnInit, OnDestroy, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { Web3Provider, AccountProvider } from '../../providers';

import { KeystoreDialog } from '../keystore-dialog/keystore.component'
import { SendDialog } from '../send-dialog/send.component'
import { ConfirmDialog } from '../confirm-dialog/confirm.component';
import { BuyCryptoDialog } from '../buy-crypto-dialog/buy.component';

@Component({
  selector: 'mini-account-component',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MiniAccountComponent implements OnInit, OnDestroy {

  balance;
  changedSubscription;
  interval
  ethBalance;

  @Input('account') account;
  @Input('index') index;
  @Output('delete') delete = new EventEmitter();
  @Output('change') change = new EventEmitter();
  @ViewChild('address') address;

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatDialog: MatDialog,
    private MatSnackBar: MatSnackBar,
    private Web3Provider: Web3Provider,
    private AccountProvider: AccountProvider
  ) { }

  ngOnInit() {
    this.setBalance();
    this.interval = setInterval(() => {
      this.setBalance();
    }, 30 * 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  showKeyStore() {

    let dialogRef = this.MatDialog.open(KeystoreDialog, {
      width: '450px',
      data: {
        keyStore: this.account.keyStore
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });

  }

  send() {
    let dialogRef = this.MatDialog.open(SendDialog, {
      width: '450px',
      data: this.account
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res != null) {
        this.change.emit(res.result);
        this.AccountProvider.resetBalance();
      }
    });
  }

  setBalance() {
    this.Web3Provider.getBalance(this.account.address).then((balance) => {

      if (this.balance != null && this.balance != balance) {
        this.AccountProvider.resetBalance();
        this.openSnackBar(`${this.account.name} account changed from ${this.balance} to ${balance}`);
      }

      this.balance = Number(balance);
      this.ChangeDetectorRef.markForCheck();

    }).catch((e) => {
      console.log(e)
    });

    this.Web3Provider.getEthBalance(this.account.address).then((data) => {
      this.ethBalance = data;
      this.ChangeDetectorRef.markForCheck();
    }).catch((e) => {
      console.log(e)
    })

  }

  onDelete() {

    let dialogRef = this.MatDialog.open(ConfirmDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(this.index);
      }
    })
  }

  openSnackBar(message: string) {
    this.MatSnackBar.open(message);
    setTimeout(() => {
      this.MatSnackBar.dismiss();
    }, 2000)
  }

  buy() {
    let dialogRef = this.MatDialog.open(BuyCryptoDialog, {
      width: '450px',
      data: {
        account: this.account
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }

  copy() {

    const selection = window.getSelection();
    const range = document.createRange();

    range.setStartBefore(this.address.nativeElement);
    range.setEndAfter(this.address.nativeElement);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy")

    this.MatSnackBar.open('Address is copied !');

    setTimeout(() => {
      this.MatSnackBar.dismiss();
    }, 2000)
  }

}
