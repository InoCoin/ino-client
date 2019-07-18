import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';

import { UserProvider, LoaderProvider } from '../../providers'
import { Errors, passwordMatchValidator } from '../../../globals/errors';

@Component({
  selector: 'registration',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Registration {

  profileImage: any

  errors: any = {};
  success = false;
  isSubmitted = false;
  serverError = false;

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
    @Inject(DOCUMENT) private DOCUMENT: any,
    private UserProvider: UserProvider,
    private LoaderProvider: LoaderProvider,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  onSubmit() {

    let keys = Object.keys(this.signupForm.controls);

    this.isSubmitted = true;
    this.serverError = false;
    this.success = false;
    this.errors = {};

    if (this.signupForm.valid) {

      let insert = this.signupForm.value;

      this.LoaderProvider.show();
      this.UserProvider.post(insert).subscribe((res: any) => {

        if (res.errors) {
          this.errors = res.errors;
          this.serverError = true;
          this.ChangeDetectorRef.markForCheck();
          return this.LoaderProvider.hide();
        } else if (res.result != null && this.profileImage == null) {
          this.success = true;
          this.signupForm.reset();
          return this.LoaderProvider.hide();
        }

      });


      return this.ChangeDetectorRef.markForCheck();
    }

    keys.forEach((key: string) => {
      if (this.signupForm.controls[key].invalid) {
        let errors = Object.keys(this.signupForm.controls[key].errors);
        this.errors[key] = [];
        errors.forEach((e: string) => {
          this.errors[key].push(Errors[e](this.signupForm.controls[key], key))
        });
      }
    });

    return this.ChangeDetectorRef.markForCheck();

  }

  isValid(name) {
    return this.isSubmitted && this.signupForm.controls[name].invalid;
  }

}
