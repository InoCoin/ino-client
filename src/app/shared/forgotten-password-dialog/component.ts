import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterDialog } from '../register-dialog/component';
import { UserProvider } from '../../providers'
import { Errors } from '../../../globals/errors';
import { SuccessDialog } from '../success-dialog';

@Component({
  selector: 'forgotten-password-dialog-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ForgottenPasswordDialog {

  errors: any = {};
  isSubmitted = false;
  serverError = false;

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.email,
    ])
  });

  constructor(
    private Router: Router,
    private UserProvider: UserProvider,
    private MatDialog: MatDialog,
    private MatDialogRef: MatDialogRef<ForgottenPasswordDialog>,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  openRegister() {
    this.close();
    setTimeout(() => {
      this.MatDialog.open(RegisterDialog);
    }, 100);
  }

  openLoginDialog(){
    this.close();
    setTimeout(() => {
      this.Router.navigateByUrl('/user/login');
    }, 100);
  }

  openSuccess() {
    this.close();
    setTimeout(() => {
      this.MatDialog.open(SuccessDialog, {
        data: {
          title: 'Forgotten password',
          description: 'Please, check your E-mail for instructions'
        }
      });
    }, 100);
  }

  onSubmit() {

    this.errors = {};

    if (this.form.valid) {
      this.isSubmitted = true;
      return this.UserProvider.resetPassword(this.form.value).subscribe((res: any) => {
        if (res.errors) {
          this.errors = res.errors;
          this.isSubmitted = false;
          return this.ChangeDetectorRef.markForCheck();
        }
        return this.openSuccess();
      });
    }

    let keys = Object.keys(this.form.controls);

    keys.forEach((key: string) => {
      if (this.form.controls[key].invalid) {
        const control = this.form.controls[key];
        let errors = Object.keys(control.errors);
        this.errors[key] = [];
        control.markAsTouched();
        control.markAsDirty();
        errors.forEach((e: string) => {
          this.errors[key].push(Errors[e](control, key))
        });
      }
    });

    this.ChangeDetectorRef.markForCheck();
    return this.errors;
  }

  facebookAuth() {
    this.UserProvider.facebookAuth().then((res) => {
      this.close();
    }).catch((e) => {

    });
  }

  close() {
    this.MatDialogRef.close();
  }

}
