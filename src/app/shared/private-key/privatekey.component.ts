import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { LoaderProvider, Web3Provider } from '../../providers';
import { Errors } from '../../../globals/errors';

@Component({
  selector: 'private-dialog',
  templateUrl: './privatekey.component.html',
  styleUrls: ['./privatekey.component.scss']
})

export class PrivateKeyDialog {

  privateKey;
  errors: any = {};

  @ViewChild('pkey') pkey;

  privateKeyForm = new FormGroup({
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    public MatDialogRef: MatDialogRef<PrivateKeyDialog>,
    private LoaderProvider: LoaderProvider,
    private Web3Provider: Web3Provider,
    private MatSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  exportPrivateKey() {

    let keys = Object.keys(this.privateKeyForm.controls);
    this.errors = {};
    this.privateKey = null;

    if (this.privateKeyForm.valid) {

      this.LoaderProvider.show();

      return setTimeout(() => {
        const privateKey = this.Web3Provider.getPrivKey(this.data.keyStore, this.privateKeyForm.controls.password.value)
          .then((data: any) => {
            this.privateKey = data.privateKey;
            this.LoaderProvider.hide();
          }).catch((e) => {
            this.errors.password = ['Wrong password !'];
            this.LoaderProvider.hide();
          });
      }, 200);


    }

    keys.forEach((key: string) => {
      if (this.privateKeyForm.controls[key].invalid) {
        let errors = Object.keys(this.privateKeyForm.controls[key].errors);
        this.errors[key] = [];
        errors.forEach((e: string) => {
          this.errors[key].push(Errors[e](this.privateKeyForm.controls[key], key))
        });
      }
    });

  }

  copy() {

    const selection = window.getSelection();
    const range = document.createRange();

    range.setStartBefore(this.pkey.nativeElement);
    range.setEndAfter(this.pkey.nativeElement);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy")

    this.MatSnackBar.open('Private key is copied !');

    setTimeout(() => {
      this.MatSnackBar.dismiss();
    }, 2000)
  }

  getKeys() {
    return Object.keys(this.errors);
  }

}
