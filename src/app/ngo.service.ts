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
const getNgoUrl = 'https://nirgapfsz5.execute-api.ap-south-1.amazonaws.com/dev/ngo/getAllNGO';

@Injectable({
  providedIn: 'root'
})

export class NgoService {

  constructor(  private http: HttpClient) { 
     
  }

  body = {
    "city" : "Bengaluru"
  };

  getAllNGO(): Observable<any>{
    return this.http.post<any>(getNgoUrl,this.body,httpOptions);
  
  }
}
