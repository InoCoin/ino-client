import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import { RouterModule, UrlSerializer } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatSidenavModule, MatRippleModule, MatDialogModule } from '@angular/material';

import { TransferHttpCacheModule } from './modules/transfer_http';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { environment } from '../environments/environment';
import { LazyImageModule } from './shared/lazy-image-component';
import { LoginDialogModule, LoginDialog } from './shared/login-dialog';
import { ChangePasswordDialogModule, ChangePasswordDialog } from './shared/change-password';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'project' }),
    TransferHttpCacheModule,
    RouterModule.forRoot(MODULE_ROUTES, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      malformedUriErrorHandler: malFormedURI,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRippleModule,
    MatDialogModule,
    LazyImageModule,
    LoginDialogModule,
    ChangePasswordDialogModule
  ],
  entryComponents: [
    LoginDialog,
    ChangePasswordDialog
  ],
  exports: [
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRippleModule,
    MatDialogModule,
    LazyImageModule,
    LoginDialogModule,
    ChangePasswordDialogModule
  ]
})

export class AppModule { }

export function malFormedURI(error: URIError, urlSerializer: UrlSerializer, url: string) {
  return urlSerializer.parse('/')
};
