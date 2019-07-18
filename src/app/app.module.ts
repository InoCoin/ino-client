import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from "@angular/cdk/overlay";

import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatSidenavModule
} from '@angular/material'

import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { environment } from '../environments/environment';

import {
  ApiProvider,
  UserProvider,
  ProjectProvider,
  AccountProvider,
  TransactionProvider,
  VoteProvider,
  PaymentProvider,
  ConfigurationProvider,
  BoostProvider,
  SocketProvider,
  PlaceProvider,
  FileProvider,
  AccountPlaceProvider,

  TransferState,
  Web3Provider,
  LoaderProvider,
  AuthGuardProvider,
  NotAuthGuardProvider,
  AdminGuardProvider
} from './providers';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ino-app' }),
    RouterModule.forRoot(MODULE_ROUTES, { initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,

    //Material
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    OverlayModule
  ],
  providers: [
    ApiProvider,
    ProjectProvider,
    UserProvider,
    AccountProvider,
    TransactionProvider,
    VoteProvider,
    PaymentProvider,
    ConfigurationProvider,
    BoostProvider,
    SocketProvider,
    PlaceProvider,
    FileProvider,
    AccountPlaceProvider,

    TransferState,
    Web3Provider,
    LoaderProvider,
    AuthGuardProvider,
    NotAuthGuardProvider,
    AdminGuardProvider
  ],
  exports: [
    RouterModule,
    //Material
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ]
})

export class AppModule { }
