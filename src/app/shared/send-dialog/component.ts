import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Web3Provider, TransactionProvider, LoaderProvider } from '../../providers';
import { Errors } from '../../../globals/errors';


@Component({
  selector: 'send-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class SendDialog {

  error = '';
  errors: any = {};

  sendForm = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ])
  });

  constructor(
    public MatDialogRef: MatDialogRef<SendDialog>,
    private Web3Provider: Web3Provider,
    private TransactionProvider: TransactionProvider,
    private LoaderProvider: LoaderProvider,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onSubmit() {

    this.error = '';
    this.errors = {};

    if (this.sendForm.invalid) {

      let keys = Object.keys(this.sendForm.controls);

      keys.forEach((key: string) => {
        if (this.sendForm.controls[key].invalid) {

          let errors = Object.keys(this.sendForm.controls[key].errors);
          this.errors[key] = [];

          errors.forEach((e: string) => {
            this.errors[key].push(Errors[e](this.sendForm.controls[key], key, true))
          });

        }
      });

      return;
    }

    if (!this.Web3Provider.checkAddress(this.sendForm.controls.address.value)) {

      if (Array.isArray(this.errors.address)) {
        return this.errors.address.push('Address is not valid !');
      }

      return this.errors.address = ['Address is not valid !'];
    }

    this.LoaderProvider.show();
    this.Web3Provider.getPrivKey(this.data.keyStore, this.sendForm.controls.password.value).then((accountData: any) => {

      this.Web3Provider.createTransaction(accountData.privateKey, this.data.address, Number(this.sendForm.controls.amount.value), this.sendForm.controls.address.value)
        .then((transactionHash) => {
          this.TransactionProvider.post({
            transaction: transactionHash,
            from: this.data.address,
            to: this.sendForm.controls.address.value,
            value: Number(this.sendForm.controls.amount.value)
          }).subscribe((res: any) => {
            this.MatDialogRef.close({
              result: res.result
            });
            this.LoaderProvider.hide();
          })

        }).catch((e) => {
          console.log(e)
          this.error = 'Sorry, something went wrong, try again later ( no gas )...'
          this.LoaderProvider.hide();
        });
        
    }).catch((e) => {
      console.log(e)
      this.error = 'Sorry, something went wrong, try again later ( wrong password )... '
      this.LoaderProvider.hide();
    })

  }

  getKeys() {
    return Object.keys(this.errors);
  }

}
