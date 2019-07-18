import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Errors, passwordMatchValidator } from '../../../globals/errors';

@Component({
  selector: 'account-new-dialog',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
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
    @Inject(MAT_DIALOG_DATA) public data: any
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

    this.MatDialogRef.close(this.accountForm.value);
  }

  getKeys() {
    return Object.keys(this.errors);
  }

}
