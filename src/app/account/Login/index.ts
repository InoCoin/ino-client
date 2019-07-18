import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider, LoaderProvider } from '../../providers'
import { Errors } from '../../../globals/errors';

@Component({
  selector: 'login',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Login {

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
    private Router: Router,
    private UserProvider: UserProvider,
    private LoaderProvider: LoaderProvider,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  onSubmit() {
    let keys = Object.keys(this.loginForm.controls);

    this.isSubmitted = true;
    this.serverError = false;
    this.errors = {};

    if (this.loginForm.valid) {
      this.LoaderProvider.show();
      this.UserProvider.authenticate(this.loginForm.value).subscribe((res: any) => {
        this.LoaderProvider.hide();
        if (res.errors) {
          this.errors = res.errors;
          this.serverError = true;
          this.ChangeDetectorRef.markForCheck();
          return;
        }
        this.Router.navigate(['/']);
      })
    }

    keys.forEach((key: string) => {
      if (this.loginForm.controls[key].invalid) {
        let errors = Object.keys(this.loginForm.controls[key].errors);
        this.errors[key] = [];
        errors.forEach((e: string) => {
          this.errors[key].push(Errors[e](this.loginForm.controls[key], key))
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
    return this.isSubmitted && this.loginForm.controls[name].invalid;
  }

  facebookAuth() {
    this.UserProvider.facebookAuth().then((res) => {
      this.Router.navigate(['/account/projects']);
    }).catch((e) => {

    });
  }

}
