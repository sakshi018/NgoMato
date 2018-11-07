import { Injectable, Inject } from '@angular/core';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class NgoMatoDataService {

    //@Output() public currentUser: EventEmitter<any> = new EventEmitter<any>();
    public currentUser: string;

    constructor() {

    }

}