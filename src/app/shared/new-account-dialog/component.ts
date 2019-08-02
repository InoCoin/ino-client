import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Errors, passwordMatchValidator } from '../../../globals/errors';
import { AccountProvider, Web3Provider } from 'src/app/providers';

@Component({
  selector: 'new-account-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class NewAccountDialog {

  errors: any = {};

  accountForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
    ])
  }, passwordMatchValidator);

  constructor(
    public MatDialogRef: MatDialogRef<NewAccountDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private AccountProvider: AccountProvider,
    private Web3Provider: Web3Provider
  ) { }

  onSubmit() {

    this.errors = {};

    if (this.accountForm.invalid) {
      let keys = Object.keys(this.accountForm.controls);

      keys.forEach((key: string) => {
        if (this.accountForm.controls[key].invalid) {

          let errors = Object.keys(this.accountForm.controls[key].errors);
          this.errors[key] = [];

          errors.forEach((e: string) => {
            this.errors[key].push(Errors[e](this.accountForm.controls[key], key, true))
          });

        }
      });

      return;

    }

    const account = this.Web3Provider.createAccount();
    const value = this.accountForm.value;
    value.address = account.address;


    this.Web3Provider.exportKeyStore(account.privateKey, value.password).then((kStore) => {

      value.keyStore = kStore;

      this.AccountProvider.post(value).subscribe((res: any) => {
        if (res.result) {
          this.generateFile(value)
        }
      });

    }).catch((e) => {
      console.log(e)
    })

    this.MatDialogRef.close(this.accountForm.value);
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

  getKeys() {
    return Object.keys(this.errors);
  }

}
