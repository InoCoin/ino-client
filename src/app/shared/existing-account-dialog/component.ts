import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Errors } from '../../../globals/errors';
import { AccountProvider } from 'src/app/providers';

@Component({
  selector: 'existing-account-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class ExistingAccountDialog {

  errors: any = {};

  accountForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    keyStore: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(
    public MatDialogRef: MatDialogRef<ExistingAccountDialog>,
    private AccountProvider: AccountProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onUpload() {
    setTimeout(() => {
      let input: any = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.multiple = false;
      input.onchange = this.handleFile.bind(this);
      input.click();
      input.remove();
    }, 200);
  }

  handleFile(event: any) {
    let files: File = event.target.files;
    if (files) {

      let fs = Object.keys(files);

      fs.forEach((o) => {

        let file = files[o];
        let fr = new FileReader();

        fr.onload = (e: any) => {
          let result = e.target.result;

          if (this.validate(result)) {
            this.accountForm.controls.keyStore.setValue(result);
          } else {
            this.errors.keyStore = ['KeyStore not valid !'];
          }

        }

        fr.readAsText(file);

      });
    }
  }

  validate(keystore) {

    let k = ['address', 'crypto', 'id', 'version'];
    let crypto = ['cipher', 'cipherparams', 'ciphertext', 'kdf', 'kdfparams', 'mac'];

    try {
      keystore = JSON.parse(keystore);
    } catch (e) {
      return false;
    }

    if (!(keystore instanceof Object)) {
      return false;
    }

    for (let i = 0; i < k.length; i++) {
      if (keystore[k[i]] == null) {
        return false;
      }
    }

    for (let i = 0; i < crypto.length; i++) {
      if (keystore.crypto[crypto[i]] == null) {
        return false;
      }
    }

    return true;

  }


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

    if (!this.validate(this.accountForm.controls.keyStore.value)) {
      return this.errors.keyStore = ['KeyStore not valid !'];
    }


    const value = this.accountForm.value;

    value.keyStore = JSON.parse(this.accountForm.controls.keyStore.value);
    value.address = '0x' + value.keyStore.address;

    this.AccountProvider.post(value).subscribe();
    this.MatDialogRef.close(this.accountForm.value);

  }

  getKeys() {
    return Object.keys(this.errors);
  }

}
