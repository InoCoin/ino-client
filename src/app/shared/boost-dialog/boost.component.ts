import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { Web3Provider, AccountProvider, TransactionProvider, LoaderProvider, BoostProvider } from '../../providers';
import { Errors } from '../../../globals/errors';

@Component({
  selector: 'boost-dialog',
  templateUrl: './boost.component.html',
  styleUrls: ['./boost.component.scss']
})

export class BoostDialog implements OnInit {

  errors: any = {};
  error = '';

  boostForm = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    selected: new FormControl(0, [
      Validators.required,
    ]),
  });

  accounts = [];

  constructor(
    public MatDialogRef: MatDialogRef<BoostDialog>,
    private Web3Provider: Web3Provider,
    private AccountProvider: AccountProvider,
    private TransactionProvider: TransactionProvider,
    private BoostProvider: BoostProvider,
    private LoaderProvider: LoaderProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.boostForm.controls.address.setValue(this.data.project.address);
    this.boostForm.controls.address.disable();
  }

  ngOnInit() {
    this.AccountProvider.getAllUserAccounts().subscribe((res) => {
      if (res.result) {
        res.result.forEach((account) => {
          this.Web3Provider.getBalance(account.address).then((data: number) => {

            account.balance = Number(data);
            this.accounts.push(account);

          }).catch((e) => {
            console.log(e)
          })
        })
      }
    })
  }

  getKeys() {
    return Object.keys(this.errors);
  }

  onSubmit() {

    this.errors = {};
    this.error = '';

    if (this.boostForm.invalid) {
      let keys = Object.keys(this.boostForm.controls);

      keys.forEach((key: string) => {
        if (this.boostForm.controls[key].invalid) {

          let errors = Object.keys(this.boostForm.controls[key].errors);
          this.errors[key] = [];

          errors.forEach((e: string) => {
            this.errors[key].push(Errors[e](this.boostForm.controls[key], key, true))
          });

        }
      });
      return;
    }

    const acc = this.accounts[this.boostForm.controls.selected.value];

    this.LoaderProvider.show();
    this.Web3Provider.getPrivKey(acc.keyStore, this.boostForm.controls.password.value).then((accountData: any) => {

      this.Web3Provider.createTransaction(accountData.privateKey, acc.address, Number(this.boostForm.controls.amount.value), this.boostForm.controls.address.value).then((log) => {
        this.BoostProvider.post({
          transaction: log.transactionHash,
          projectId: this.data.project._id,
          accountId: acc._id,
          value: Number(this.boostForm.controls.amount.value),
        }).subscribe((res) => { })

        this.TransactionProvider.post({
          transaction: log.transactionHash,
          from: acc.address,
          to: this.boostForm.controls.address.value,
          value: Number(this.boostForm.controls.amount.value)
        }).subscribe((res) => {
          this.MatDialogRef.close({
            result: res.result
          });
          this.LoaderProvider.hide();
        })

      }).catch((e) => {
        this.error = 'Sorry, something went wrong, try again later ( no gas )...'
        this.LoaderProvider.hide();
      });
    }).catch((e) => {
      this.error = 'Sorry, something went wrong, try again later ( wrong password )... '
      this.LoaderProvider.hide();
    })

  }

}
