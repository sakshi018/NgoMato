import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

export interface ngo{
  name : string;
  city : string;
  address : string;
  category : string;
  requiremnt : string[];
  email : string;
  phone : number; 
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const getNgoUrl = 'https://h5qk7d3pm1.execute-api.ap-south-1.amazonaws.com/dev/ngo/getAllNGO';
const getDonationsForUserUrl = "https://h5qk7d3pm1.execute-api.ap-south-1.amazonaws.com/dev/ngo/getDonationsForUser";

@Injectable({
  providedIn: 'root'
})

export class NgoService {

  constructor(  private http: HttpClient) { 
     
  }
  getAllNGO(body): Observable<any>{
    return this.http.post<any>(getNgoUrl,body,httpOptions);
  }

  getDonationsForUser(body): Observable<any>{
    return this.http.post<any>(getDonationsForUserUrl,body,httpOptions);
  }
}
