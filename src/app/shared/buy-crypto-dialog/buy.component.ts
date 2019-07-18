import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { PaymentMethods, CoinLibAPI, CoinLibKey, Currency, Coin, Account } from '../../../globals/config';
import { ApiProvider, Web3Provider, LoaderProvider, PaymentProvider, TransferState } from '../../providers';

@Component({
  selector: 'buy-crypto-dialog',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuyCryptoDialog implements OnInit, OnDestroy {

  time;
  inoPrice;
  ethPrice;
  bitcoinPrice;
  total;

  error = '';
  message = '';
  paymentMethods = PaymentMethods;
  currency = PaymentMethods.ether.key;

  formETH = new FormGroup({
    amount: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  formBTC = new FormGroup({
    amount: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor(
    private ApiProvider: ApiProvider,
    private Web3Provider: Web3Provider,
    private PaymentProvider: PaymentProvider,
    private LoaderProvider: LoaderProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private TransferState: TransferState,
    public MatDialogRef: MatDialogRef<BuyCryptoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const user = this.TransferState.get('user');
    this.formBTC.controls.email.setValue(user.email);
  }

  ngOnInit() {
    this.getPrice();
    this.time = setInterval(() => {
      this.getPrice();
    }, 1000 * 60 * 10);
  }

  ngOnDestroy() {
    clearInterval(this.time);
  }

  getPrice() {
    this.ApiProvider.getExternal(`${CoinLibAPI}?key=${CoinLibKey}&pref=${Currency}&symbol=${Coin},${PaymentMethods.ether.symbol},${PaymentMethods.bitcoin.symbol}`).subscribe((res) => {
      this.inoPrice = res.coins[0];
      this.ethPrice = res.coins[1];
      this.bitcoinPrice = res.coins[2];
      this.ChangeDetectorRef.markForCheck();
    });
  }

  onSelect() {
    this.message = '';
    this.error = '';
    this.onChange();
  }

  onChange() {

    switch (this.currency) {
      case (PaymentMethods.ether.key): {

        if (this.isValid(this.formETH)) {

          const value = Number(this.formETH.controls.amount.value).toFixed(0);
          const coins = Number(value);
          const priceUSD = coins * Number(this.inoPrice.price);

          this.total = priceUSD / Number(this.ethPrice.price);
          this.total = this.total.toFixed(18);
          this.formETH.controls.amount.setValue(Number(value));

        }

        break;
      }
      case (PaymentMethods.bitcoin.key): {

        if (this.isValid(this.formBTC)) {

          const value = Number(this.formBTC.controls.amount.value).toFixed(0);
          const coins = Number(value);
          const priceUSD = coins * Number(this.inoPrice.price);

          this.total = priceUSD / Number(this.bitcoinPrice.price);
          this.total = this.total.toFixed(8);
          this.formBTC.controls.amount.setValue(Number(value));
          
        }

        break;
      }
    }

    this.ChangeDetectorRef.markForCheck();
  }

  isValid(form) {
    if (form.controls.amount.invalid || this.inoPrice == null || this.ethPrice == null || this.bitcoinPrice == null) {
      return false;
    }
    return true;
  }

  isHidden() {
    if (this.total == null) {
      return true;
    }
    return false;
  }

  onSubmit() {

    switch (this.currency) {
      case (PaymentMethods.ether.key): {
        if (this.formETH.valid && this.formETH.controls.amount.value > 0) {
          this.error = '';
          this.message = '';
          this.LoaderProvider.show();
          this.Web3Provider.getPrivKey(this.data.account.keyStore, this.formETH.controls.password.value).then((privKey: any) => {

            this.Web3Provider.sendEthers(privKey.privateKey, this.data.account.address, this.total, Account).then((data) => {

              this.PaymentProvider.buyByEther({
                type: this.currency,
                accountId: this.data.account._id,
                amount: this.formETH.controls.amount.value,
                price: Number(this.total),
                serviceCosts: 0,
                token: data.transactionHash,
                address: this.data.account.address
              }).subscribe((res) => {
                this.message = 'We will send InoCoins in a moment !';
                this.formETH.controls.amount.setValue(0);
                this.formETH.controls.password.setValue('');
                this.total = 0;
                this.LoaderProvider.hide();
                this.ChangeDetectorRef.markForCheck();
              })

              // transactionHash
            }).catch((e) => {
              console.log(e)
              this.error = 'Sorry, something went wrong, try again later ( no gas )...';
              this.LoaderProvider.hide();
              this.ChangeDetectorRef.markForCheck();
            });

          }).catch((e) => {
            this.error = 'Incorrect password !';
            this.LoaderProvider.hide();
            this.ChangeDetectorRef.markForCheck();
          });

        }
        break;
      }
      case (PaymentMethods.bitcoin.key): {
        if (this.formBTC.valid && this.formBTC.controls.amount.value > 0) {

          this.error = '';
          this.message = '';
          this.LoaderProvider.show();

          this.PaymentProvider.buyByBitcoin({
            type: this.currency,
            accountId: this.data.account._id,
            amount: this.formBTC.controls.amount.value,
            email: this.formBTC.controls.email.value,
            price: Number(this.total),
            serviceCosts: 0,
            address: this.data.account.address
          }).subscribe((res) => {
            this.message = 'Our team will contact you to complete transaction ( check your mail spam section ) !';
            this.formBTC.controls.amount.setValue(0);
            this.total = 0;
            this.LoaderProvider.hide();
            this.ChangeDetectorRef.markForCheck();
          })
        }
        break;
      }
    }


  }

}
