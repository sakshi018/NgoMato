import { Component, Output, Input, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Ngo} from './shared/ngo.class';


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

  ngoNameList : string[];

  myControl = new FormControl();
  options: NgoName[] = [];
  filteredOptions: Observable<NgoName[]>;
  loadNgoPage: Boolean;
  loadNgoId: Ngo;

  ngOnInit() {
    this.loadNgoPage = false;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | NgoName>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  getNgoNames(event){

    this.options = event;
  }

  loadNgo(event){
    this.loadNgoPage = true;//one button to toggle between ngoList and ngoPage
    this.loadNgoId = event;
  }

  ngoCitySearchedClicked(event){
    console.log("Clciked!!");
    this.loadNgoPage = false;
  }

  displayFn(NgoName?: NgoName): string | undefined {
    return NgoName ? NgoName.name : undefined;
  }

  private _filter(name: string): NgoName[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
