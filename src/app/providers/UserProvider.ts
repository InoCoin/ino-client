import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ApiProvider } from './ApiProvider';
import { TransferState } from './TransferState';
import { AccountProvider } from './AccountProvider';
import { SocketProvider } from './SocketProvider';

declare const FB: any;

@Injectable()
export class UserProvider {

  private path: string = 'user'
  private paths: string = 'users'

  constructor(
    private ApiProvider: ApiProvider,
    private AccountProvider: AccountProvider,
    private SocketProvider: SocketProvider,
    private TransferState: TransferState
  ) { }

  getAdmin(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/admin/${skip}/${limit}`);
  }

  post(data) {
    return this.ApiProvider.post(`${this.path}/activation-pending`, data);
  }

  postActivation(token) {
    return this.ApiProvider.post(`${this.path}/activate`, { token })
    .pipe(map((res: any) => {
      if (res.result) {
        this.TransferState.set('user', res.result);
        this.AccountProvider.resetBalance();
        this.AccountProvider.syncBalance()
        this.SocketProvider.reconnect();
      }
      return res;
    }));
  }

  putAdmin(userId, data) {
    return this.ApiProvider.put(`${this.path}/admin`, {
      userId,
      data: data
    });
  }

  authenticate({ email, password }: any) {
    return this.ApiProvider.post(`${this.path}/authenticate`, {
      email,
      password
    }).pipe(map((res: any) => {
      if (res.result) {
        this.TransferState.set('user', res.result);
        this.AccountProvider.resetBalance();
        this.AccountProvider.syncBalance();
        this.SocketProvider.reconnect();
      } return res;
    }));
  }

  getUser() {
    return this.ApiProvider.get(`${this.path}/authenticate`)
      .pipe(map((res: any) => {
        if (res.result) {
          this.TransferState.set('user', res.result);
        }
        return res;
      }));
  }

  getAuth() {
    return this.ApiProvider.get(`${this.path}/authenticate`)
      .pipe(map((res: any) => {
        if (res.result) {
          this.TransferState.set('user', res.result);
          this.AccountProvider.resetBalance();
          this.AccountProvider.syncBalance();
        }
        this.SocketProvider.init();
        return res;
      }));
  }

  logOut() {
    return this.ApiProvider.get(`${this.path}/logOut`)
      .pipe(map((res: any) => {
        if (res.result) {
          this.TransferState.set('user', null);
          this.AccountProvider.resetBalance();
          this.AccountProvider.removeSyncBalance()
          this.SocketProvider.reconnect();
        }
        return res;
      }));
  }

  facebookAuth() {
    return new Promise((resolve, reject) => {
      return FB.login((response: any) => {
        if (response.authResponse == null) {
          return reject();
        }
        return this.ApiProvider.post(`${this.path}/authenticate/facebook`, {
          accessToken: response.authResponse.accessToken
        }).subscribe((res) => {
          if (res.result) {
            this.TransferState.set('user', res.result);
            this.AccountProvider.resetBalance();
            this.AccountProvider.syncBalance()
            this.SocketProvider.reconnect();
          }
          resolve(res);
        })
      }, { scope: 'email' });
    });
  }

  resetPassword({ email }) {
    return this.ApiProvider.post(`${this.path}/reset-password`, {
      email
    });
  }

  changePassowrd({ password, passwordConfirm, token }) {
    return this.ApiProvider.post(`${this.path}/change-password`, {
      password,
      passwordConfirm,
      token
    });
  }

}
