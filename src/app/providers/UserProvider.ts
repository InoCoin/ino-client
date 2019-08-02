import { Injectable, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';

import { ApiProvider } from './ApiProvider';
import { MapProvider } from './MapProvider';
import { AccountProvider } from './AccountProvider';
import { SocketProvider } from './SocketProvider';
import { LoaderProvider } from './LoaderProvider';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})

export class UserProvider {

  private path: string = 'user'
  private paths: string = 'users'

  constructor(
    private NgZone: NgZone,
    private LoaderProvider: LoaderProvider,
    private ApiProvider: ApiProvider,
    private AccountProvider: AccountProvider,
    private SocketProvider: SocketProvider,
    private MapProvider: MapProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.LoaderProvider.show();
    if (isPlatformBrowser(this.platformId)) {
      this.getAuth().subscribe(() => {
        this.LoaderProvider.hide(1200);
      });
    }
  }

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
          this.MapProvider.set('user', res.result);
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
        this.MapProvider.set('user', res.result);
        this.AccountProvider.resetBalance();
        this.AccountProvider.syncBalance();
        this.SocketProvider.reconnect();
      } return res;
    }));
  }

  updatePassowrd(data) {
    return this.ApiProvider.put(`${this.path}/update-password`, { data });
  }

  getUser() {
    return this.ApiProvider.get(`${this.path}/authenticate`)
      .pipe(map((res: any) => {
        if (res.result) {
          this.MapProvider.set('user', res.result);
        }
        return res;
      }));
  }

  private getAuth() {
    return this.ApiProvider.get(`${this.path}/authenticate`)
      .pipe(map((res: any) => {
        if (res.result) {
          this.MapProvider.set('user', res.result);
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
          this.MapProvider.set('user', null);
          this.AccountProvider.resetBalance();
          this.AccountProvider.removeSyncBalance()
          this.SocketProvider.reconnect();
        }
        return res;
      }));
  }

  facebookAuth() {
    return new Promise((resolve, reject) => {
      return this.NgZone.runOutsideAngular(() => {
        return FB.login((response: any) => {
          if (response.authResponse == null) {
            return reject();
          }
          return this.ApiProvider.post(`${this.path}/authenticate/facebook`, {
            accessToken: response.authResponse.accessToken
          }).subscribe((res: any) => {
            if (res.result) {
              this.MapProvider.set('user', res.result);
              this.AccountProvider.resetBalance();
              this.AccountProvider.syncBalance()
              this.SocketProvider.reconnect();
            }
            resolve(res);
          })
        }, { scope: 'email' });
      });
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
