import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Environment } from '../../globals/config';

@Injectable()
export class ApiProvider {

  constructor(
    private Http: HttpClient,
  ) { }

  getExternal(path: string): any {
    return this.Http.get(`${path}`)
      .pipe(catchError(this.handleError));
  }

  get(path: string): any {
    return this.Http.get(`${Environment.api_url}/api/${Environment.api_version}/${path}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  post(path: string, body?: any): any {
    return this.Http.post(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  put(path: string, body: any): any {
    return this.Http.put(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  patch(path: string, body: any): any {
    return this.Http.patch(`${Environment.api_url}/api/${Environment.api_version}/${path}`, body, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  delete(path: string): any {
    return this.Http.delete(`${Environment.api_url}/api/${Environment.api_version}/${path}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(errMsg);
  }

}
