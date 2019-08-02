import { Component, ChangeDetectionStrategy, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { MatDialog } from '@angular/material';

import { RegisterDialog } from 'src/app/shared/register-dialog';
import { LoginDialog } from 'src/app/shared/login-dialog';
import { TokenDialog } from 'src/app/shared/token-dialog';
import { ForgottenPasswordDialog } from 'src/app/shared/forgotten-password-dialog';
import { ResetPasswordDialog } from 'src/app/shared/reset-password';
import { NewModel } from 'src/app/models/NewModel';

@Component({
  selector: 'home-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnDestroy, AfterViewInit {

  subscription;
  news: NewModel[];
  actions = {
    registration: {
      key: 'registration'
    },
    login: {
      key: 'login'
    },
    activation: {
      key: 'activation'
    },
    'forgotten-password': {
      key: 'forgotten-password'
    },
    'reset-password': {
      key: 'reset-password'
    },
  }

  constructor(
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private MatDialog: MatDialog
  ) {
    this.news = this.ActivatedRoute.snapshot.data.news;
  }

  ngAfterViewInit() {
    this.subscription = this.ActivatedRoute.params.subscribe((params) => {
      switch (params.action) {
        case (this.actions.registration.key): {
          this.MatDialog.open(RegisterDialog);
          break;
        }
        case (this.actions.login.key): {
          this.MatDialog.open(LoginDialog).afterClosed().subscribe(() => {
            this.Router.navigateByUrl('/');
          });
          break;
        }
        case (this.actions.activation.key): {
          this.MatDialog.open(TokenDialog, {
            data: {
              token: params.token
            }
          });
          break;
        }
        case (this.actions['forgotten-password'].key): {
          this.MatDialog.open(ForgottenPasswordDialog);
          break;
        }
        case (this.actions['reset-password'].key): {
          this.MatDialog.open(ResetPasswordDialog, {
            data: {
              token: params.token
            }
          });
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
