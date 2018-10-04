import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ngo } from './shared/ngo.class';
import { NgoService } from './ngo.service';


export interface NgoName {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NgoMato';
  cities = ['Bengaluru', 'Mumbai', 'Hyderabad'];
  selectedCity = 'Bengaluru'; //default 

  ngoNameList: string[];
  userLoggedIn: string = 'LoginFailed';//default value when no user is logged In
  showProfile: Boolean = false;
  myControl = new FormControl();
  options: NgoName[] = [];
  filteredOptions: Observable<NgoName[]>;
  loadNgoPage: Boolean;
  loadNgoId: Ngo;
  launchLogin: Boolean = false;
  adminMode: Boolean = false;

  constructor(private ngoService: NgoService) {

  }

  ngOnInit() {
    this.loadNgoPage = false;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | NgoName>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  getNgoNames(event) {

    this.options = event;
  }

  updateLoginModalStatus() {
    this.launchLogin = false;
  }

  loginEvent(event) {
    this.launchLogin = false;
    this.userLoggedIn = event;
    if (event == "LoginFailed") {
      this.showProfile = false;

    } else if (event != 'admin') {
      this.showProfile = true;

    } else {
      this.adminMode = true;
    }


  }
  loadNgo(event) {
    this.loadNgoPage = true;//one button to toggle between ngoList and ngoPage
    this.loadNgoId = event;
  }

  ngoCitySearchedClicked(event) {
    this.loadNgoPage = false;
  }

  displayFn(NgoName?: NgoName): string | undefined {
    return NgoName ? NgoName.name : undefined;
  }

  private _filter(name: string): NgoName[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  loginClicked() {
    this.launchLogin = true;
  }

  logoutClicked() {
    this.userLoggedIn = "LoginFailed";//default name for not logged in
    this.showProfile = false;
  }

  historyClicked() {
    let body = { "userId": this.userLoggedIn };
    this.ngoService.getDonationsForUser(body);
  }
}
