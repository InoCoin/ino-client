import { Injectable, EventEmitter, Output, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { connect } from 'socket.io-client';

import { MapProvider } from './MapProvider';
import { Environment } from '../../globals/config'


@Injectable({
    providedIn: 'root'
})

export class SocketProvider {

    private socket: any;

    @Output() receiveProject: EventEmitter<any> = new EventEmitter();
    @Output() updateProject: EventEmitter<any> = new EventEmitter();
    @Output() deleteProject: EventEmitter<any> = new EventEmitter();
    @Output() updateConf: EventEmitter<any> = new EventEmitter();
    @Output() receiveRequest: EventEmitter<any> = new EventEmitter();
    @Output() updateRequest: EventEmitter<any> = new EventEmitter();
    @Output() receiveTrancation: EventEmitter<any> = new EventEmitter();
    @Output() inTrancation: EventEmitter<any> = new EventEmitter();
    @Output() outTrancation: EventEmitter<any> = new EventEmitter();
    @Output() receiveBoost: EventEmitter<any> = new EventEmitter();
    @Output() receiveAccount: EventEmitter<any> = new EventEmitter();
    @Output() deleteAccount: EventEmitter<any> = new EventEmitter();
    @Output() newPlace: EventEmitter<any> = new EventEmitter();
    @Output() updatePlace: EventEmitter<any> = new EventEmitter();
    @Output() deletePlace: EventEmitter<any> = new EventEmitter();
    @Output() newAccount: EventEmitter<any> = new EventEmitter();
    @Output() updateAccount: EventEmitter<any> = new EventEmitter();

    constructor(
        private NgZone: NgZone,
        private MapProvider: MapProvider,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    disconnect() {
        this.socket.disconnect(true);
    }

    reconnect() {
        this.disconnect();
        this.init();
    }

    init() {

        if (isPlatformBrowser(this.platformId)) {

            this.NgZone.runOutsideAngular(() => {

                const user = this.MapProvider.get('user');

                this.socket = connect(Environment.api_url, {
                    query: {
                        userId: user ? user._id : -1
                    },
                });

                this.socket.on('update-project', (data) => {
                    this.updateProject.emit(data);
                });

                this.socket.on('update-request', (data) => {
                    this.updateRequest.emit(data);
                });

                this.socket.on('update-configuration', (data) => {
                    this.updateConf.emit(data);
                })

                this.socket.on('new-project', (data) => {
                    this.receiveProject.emit(data);
                })

                this.socket.on('new-account', (data) => {
                    this.receiveAccount.emit(data);
                })

                this.socket.on('new-request', (data) => {
                    this.receiveRequest.emit(data);
                })

                this.socket.on('new-boost', (data) => {
                    this.receiveBoost.emit(data);
                })

                this.socket.on('new-transaction', (data) => {
                    this.receiveTrancation.emit(data);
                })

                this.socket.on('in-transaction', (data) => {
                    this.inTrancation.emit(data);
                })

                this.socket.on('out-transaction', (data) => {
                    this.outTrancation.emit(data);
                })

                this.socket.on('delete-project', (data) => {
                    this.deleteProject.emit(data);
                })

                this.socket.on('delete-account', (data) => {
                    this.deleteAccount.emit(data);
                })

                this.socket.on('new-place', (data) => {
                    this.newPlace.emit(data);
                })

                this.socket.on('update-place', (data) => {
                    this.updatePlace.emit(data);
                })

                this.socket.on('delete-place', (data) => {
                    this.deletePlace.emit(data);
                })

                this.socket.on('new-account', (data) => {
                    this.newAccount.emit(data);
                })

                this.socket.on('update-account', (data) => {
                    this.updateAccount.emit(data);
                });

            });

        }

    }

}
