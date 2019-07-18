import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';

import { AccountProvider, LoaderProvider, PaymentProvider, ConfigurationProvider, SocketProvider } from '../../providers';
import { Errors } from '../../../globals/errors';
import { serviceCosts, BrainTreeConfig } from '../../../globals/config';

import * as braintree from 'braintree-web';

@Component({
  selector: 'buy-dialog',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuyDialog implements OnInit, OnDestroy {

  inoPrice;
  costs;
  coinPrice;
  total;
  change;

  errors: any = {};
  isSubmitted = false;
  serverError = false;

  cardForm = new FormGroup({
    amount: new FormControl('', [
      Validators.required
    ]),
    number: new FormControl('4111111111111111', [
      Validators.required,
    ]),
    exp_month: new FormControl('12', [
      Validators.required,
    ]),
    exp_year: new FormControl('20', [
      Validators.required,
    ]),
    cvc: new FormControl('123', [
      Validators.required,
    ]),
  });

  constructor(
    public MatDialogRef: MatDialogRef<BuyDialog>,
    private LoaderProvider: LoaderProvider,
    private PaymentProvider: PaymentProvider,
    private SocketProvider: SocketProvider,
    private ConfigurationProvider: ConfigurationProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {

    this.ConfigurationProvider.get().subscribe((res) => {
      if (res.result) {
        this.inoPrice = res.result.price
      }
    })

    if (isPlatformBrowser(this.platformId)) {
      this.change = this.SocketProvider.updateConf.subscribe((data) => {
        this.inoPrice = data.price;
        this.onChange();
        this.ChangeDetectorRef.markForCheck();
      })

    }

  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.change) {
      this.change.unsubscribe();
    }
  }

  onChange() {

    const value = this.cardForm.controls.amount.value;

    this.coinPrice = null;
    this.costs = null;
    this.total = null;

    if (this.cardForm.controls.amount.value == null || isNaN(value) || value.length == 0) {
      this.ChangeDetectorRef.markForCheck();
      return;
    }

    const coins = Number(value);

    this.coinPrice = Math.ceil(coins * this.inoPrice * 100);
    this.costs = Math.ceil(serviceCosts(this.coinPrice));
    this.total = this.coinPrice + this.costs;
    this.ChangeDetectorRef.markForCheck();
  }

  isHidden() {
    if (this.coinPrice == null || this.costs == null || this.total == null) {
      return true;
    }
    return false;
  }

  onSubmit() {

    let keys = Object.keys(this.cardForm.controls);
    this.isSubmitted = true;
    this.serverError = false;
    this.errors = {};

    if (this.cardForm.valid) {

      this.LoaderProvider.show();

      return braintree.client.create({
        authorization: BrainTreeConfig.key
      }, (err, client) => {
        client.request({
          endpoint: 'payment_methods/credit_cards',
          method: 'post',
          data: {
            creditCard: {
              number: this.cardForm.controls.number.value,
              expirationDate: `${this.cardForm.controls.exp_month.value}/${this.cardForm.controls.exp_year.value}`,
              cvv: this.cardForm.controls.cvc.value,
            }
          }
        }, (err, response) => {

          if (err) {
            this.LoaderProvider.hide();
            return err;
          }

          if (response.creditCards.length > 0) {

            let card = response.creditCards[0];

            return this.PaymentProvider.post({
              accountId: this.data.account._id,
              address: this.data.account.address,
              nonce: card.nonce,
              amount: this.cardForm.controls.amount.value
              // ...this.cardForm.value
            }).subscribe((res) => {

              if (res.error) {
                this.serverError = true;
              } else {
                this.MatDialogRef.close();
              }

              this.ChangeDetectorRef.markForCheck();
              this.LoaderProvider.hide();
            })
          }

          this.LoaderProvider.hide();

        });

      });

    }

    keys.forEach((key: string) => {
      if (this.cardForm.controls[key].invalid) {
        let errors = Object.keys(this.cardForm.controls[key].errors);
        this.errors[key] = [];
        errors.forEach((e: string) => {
          this.errors[key].push(Errors[e](this.cardForm.controls[key], key))
        });
      }
    });

    return this.ChangeDetectorRef.markForCheck();
  }

}
