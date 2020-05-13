import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../shared/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private httpClient: HttpClient) { }
  public uploadFile(formData): Observable<any> {
    return this.httpClient.post<any>(AppConstants.UPLOAD_ENDPOINT, formData);
  }
}
