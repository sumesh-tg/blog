import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VendorModel } from '../models/IVendorModel';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConstants } from '../shared/AppConstants';


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  DEFAULT_SORTING="?_sort=created_at:desc";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getVendorsList(): Observable<VendorModel[]> {
    return this.http.get<VendorModel[]>(AppConstants.VENDORS_ENDPOINT+this.DEFAULT_SORTING);
  }
  saveVendor(vendorModel:VendorModel):Observable<VendorModel[]>{
    return this.http.post<VendorModel[]>(AppConstants.VENDORS_ENDPOINT,vendorModel,this.httpOptions);
  }
  updateVendor(vendorModel:VendorModel):Observable<VendorModel[]>{
    return this.http.put<VendorModel[]>(AppConstants.VENDORS_ENDPOINT+"/"+vendorModel.id,vendorModel,this.httpOptions);
  }
  deleteVendor(vendorModel:VendorModel):Observable<VendorModel>{
    return this.http.delete<VendorModel>(AppConstants.VENDORS_ENDPOINT+"/"+vendorModel.id);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    console.log("", result);
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
