import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RegisterDialog } from '../register-dialog/component';
import { UserProvider } from '../../providers'
import { Errors } from '../../../globals/errors';
import { ForgottenPasswordDialog } from '../forgotten-password-dialog';

@Component({
  selector: 'login-dialog-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginDialog {

  errors: any = {};
  isSubmitted = false;
  serverError = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ])
  });

  constructor(
    private UserProvider: UserProvider,
    private MatDialog: MatDialog,
    private MatDialogRef: MatDialogRef<LoginDialog>,
    private ChangeDetectorRef: ChangeDetectorRef,
  ) { }
  
  openRegister() {
    this.close();
    setTimeout(() => {
      this.MatDialog.open(RegisterDialog);
    }, 100);
  }

  openForgottenPassowrd() {
    this.close();
    setTimeout(() => {
      this.MatDialog.open(ForgottenPasswordDialog);
    }, 100);
  }

  onSubmit() {

    this.errors = {};

    if (this.loginForm.valid) {
      this.isSubmitted = true;
      return this.UserProvider.authenticate(this.loginForm.value).subscribe((res: any) => {
        if (res.errors) {
          this.errors = res.errors;
          this.isSubmitted = false;
          this.ChangeDetectorRef.markForCheck();
          return;
        }
        return this.close();
      });
    }

    let keys = Object.keys(this.loginForm.controls);

    keys.forEach((key: string) => {
      if (this.loginForm.controls[key].invalid) {
        const control = this.loginForm.controls[key];
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
