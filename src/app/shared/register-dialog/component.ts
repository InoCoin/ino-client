import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

import { passwordMatchValidator, Errors } from 'src/globals/errors';
import { UserProvider } from 'src/app/providers';
import { SuccessDialog } from '../success-dialog';

@Component({
  selector: 'register-dialog-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterDialog {

  errors: any = {};
  isSubmitted = false;

  signupForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ]),
    policy: new FormControl(true, [
      Validators.requiredTrue
    ]),
  }, passwordMatchValidator);

  constructor(
    private UserProvider: UserProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatDialog: MatDialog,
    private MatDialogRef: MatDialogRef<RegisterDialog>,
  ) { }

  close() {
    this.MatDialogRef.close();
  }

  openSuccess() {
    this.close();
    setTimeout(() => {
      this.MatDialog.open(SuccessDialog, {
        data:{
          title: 'Welcome to InoCoin Platform',
          description: 'Please, check your E-mail for activation link'
        }
      });
    }, 100);
  }

  onSubmit() {

    this.errors = {};

    if (this.signupForm.valid) {
      this.isSubmitted = true;
      return this.UserProvider.post(this.signupForm.value).subscribe((res: any) => {
        if (res.errors) {
          this.errors = res.errors;
          this.isSubmitted = false;
          return this.ChangeDetectorRef.markForCheck();
        }
        return this.openSuccess();
      });
    }

    let keys = Object.keys(this.signupForm.controls);

    keys.forEach((key: string) => {
      if (this.signupForm.controls[key].invalid) {
        const control = this.signupForm.controls[key];
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


}
