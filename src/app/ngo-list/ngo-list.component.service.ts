import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Donation } from './../shared/classes/donation.class';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const createDonationFromUserUrl = "https://h5qk7d3pm1.execute-api.ap-south-1.amazonaws.com/dev/ngo/createDonationFromUser";

@Injectable()
export class NGOListService {


    constructor(private http: HttpClient) {

    }

    createDonationFromUser(donationBody: Donation): Observable<any> {
        return this.http.post<any>(createDonationFromUserUrl, donationBody, httpOptions);
    }

}