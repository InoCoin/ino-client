import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider, LoaderProvider } from '../../providers'
import { Errors, passwordMatchValidator } from '../../../globals/errors';

@Component({
  selector: 'reset-password',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResetPassword implements OnInit {

  token;

  errors: any = {};
  isSubmitted = false;
  serverError = false;

  accountForm = new FormGroup({
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
    private Router: Router,
    private UserProvider: UserProvider,
    private LoaderProvider: LoaderProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((res) => {
      this.token = res.token;
    })
  }

  onSubmit() {
    let keys = Object.keys(this.accountForm.controls);

    this.isSubmitted = true;
    this.serverError = false;
    this.errors = {};

    if (this.accountForm.valid) {
      this.LoaderProvider.show();
      this.UserProvider.changePassowrd({ ...this.accountForm.value, token: this.token }).subscribe((res: any) => {
        this.LoaderProvider.hide();
        if (res.errors) {
          this.errors = res.errors;
          this.serverError = true;
          this.ChangeDetectorRef.markForCheck();
          return;
        }

        this.Router.navigate(['/account/login']);

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
