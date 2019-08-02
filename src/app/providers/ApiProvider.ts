import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Environment } from '../../globals/config';

@Injectable({
    providedIn: 'root'
})

export class ApiProvider {

    constructor(
        private HttpClient: HttpClient,
    ) { }

    getExternal(path: string): any {
        return this.HttpClient.get(`${path}`)
            .pipe(catchError(this.handleError));
    }

    get(path: string) {
        return this.HttpClient
            .get(`${Environment.api_url}/api/${Environment.api_version}/${path}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    post(path: string, body?) {
        return this.HttpClient
            .post(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    put(path: string, body) {
        return this.HttpClient
            .put(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    patch(path: string, body) {
        return this.HttpClient
            .patch(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    delete(path: string) {
        return this.HttpClient
            .delete(`${Environment.api_url}/api/${Environment.api_version}/${path}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    private handleError(error) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return throwError(errMsg);
    }

}
