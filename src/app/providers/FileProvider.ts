import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Environment } from '../../globals/config';

@Injectable({
  providedIn: 'root'
})

export class FileProvider {

  constructor(
    private Http: HttpClient,
  ) { }

  postImages(formData: any, projectId: any): any {

    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    return this.Http.post(`${Environment.api_url}/api/${Environment.api_version}/upload/images/${projectId}`, formData, { headers: headers }).pipe(catchError(this.handleError));
  }

  postGallery(formData: any, projectId: any, update: boolean): any {

    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    return this.Http.post(`${Environment.api_url}/api/${Environment.api_version}/upload/gallery/${projectId}/${update}`, formData, { headers: headers }).pipe(catchError(this.handleError));
  }

  postFiles(formData: any) {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    return this.Http.post(`${Environment.api_url}/api/${Environment.api_version}/upload/files`, formData, { headers: headers }).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(errMsg);
  }

}
