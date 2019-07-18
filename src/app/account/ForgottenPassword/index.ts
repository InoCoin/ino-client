import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider, LoaderProvider } from '../../providers'
import { Errors } from '../../../globals/errors';

@Component({
  selector: 'forgotten-password',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ForgottenPassword {

  errors: any = {};
  isSubmitted = false;
  serverError = false;
  check = false;

  accountForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.email,
    ])
  });

  constructor(
    private Router: Router,
    private UserProvider: UserProvider,
    private LoaderProvider: LoaderProvider,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  onSubmit() {
    let keys = Object.keys(this.accountForm.controls);

    this.isSubmitted = true;
    this.serverError = false;
    this.check = false;
    this.errors = {};

    if (this.accountForm.valid) {
      this.LoaderProvider.show();
      this.UserProvider.resetPassword(this.accountForm.value).subscribe((res: any) => {
        this.LoaderProvider.hide();
        if (res.errors) {
          this.errors = res.errors;
          this.serverError = true;
          this.ChangeDetectorRef.markForCheck();
          return;
        }

        this.check = true;
        this.ChangeDetectorRef.markForCheck();

      })
    }

    keys.forEach((key: string) => {
      if (this.accountForm.controls[key].invalid) {
        let errors = Object.keys(this.accountForm.controls[key].errors);
        this.errors[key] = [];
        errors.forEach((e: string) => {
          this.errors[key].push(Errors[e](this.accountForm.controls[key], key))
        });
      }
    });

    this.ChangeDetectorRef.markForCheck();
    return this.errors;
  }

  isValid(name) {
    if (this.serverError && this.errors[name] != null) {
      return true;
    }
    return this.isSubmitted && this.accountForm.controls[name].invalid;
  }

  facebookAuth() {
    this.UserProvider.facebookAuth().then((res) => {
      this.Router.navigate(['/account/projects']);
    }).catch((e) => {

    });
  }

}
