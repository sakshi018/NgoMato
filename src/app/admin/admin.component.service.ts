import { Injectable, Inject } from '@angular/core';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const getDonationForUserUrl = "https://h5qk7d3pm1.execute-api.ap-south-1.amazonaws.com/dev/ngo/getDonationsForUser";


@Injectable()
export class AdminService {

    constructor(private http: HttpClient) {

    }

    fetchDonationToNgo(userId: string): Observable<any> {
        let body = { "userId": userId };
        return this.http.post<any>(getDonationForUserUrl, body, httpOptions);
    }
}