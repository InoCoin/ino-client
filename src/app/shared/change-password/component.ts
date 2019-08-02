import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { passwordMatchValidator, Errors } from 'src/globals/errors';
import { UserProvider } from 'src/app/providers';
import { SuccessDialog } from '../success-dialog';

@Component({
  selector: 'change-password-dialog-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChangePasswordDialog {

  errors: any = {};
  isSubmitted = false;

  form = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
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
    ])
  }, passwordMatchValidator);

  constructor(
    private UserProvider: UserProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatDialog: MatDialog,
    private MatDialogRef: MatDialogRef<ChangePasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close() {
    this.MatDialogRef.close();
  }

  openSuccess() {
    this.close();
    setTimeout(() => {
      this.MatDialog.open(SuccessDialog, {
        data: {
          title: 'Change password',
          description: 'You have successfully changed your password'
        }
      });
    }, 100);
  }

  onSubmit() {

    this.errors = {};

    if (this.form.valid) {
      this.isSubmitted = true;
      return this.UserProvider.updatePassowrd(this.form.value).subscribe((res: any) => {
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


}
