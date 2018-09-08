import { Component, Output, Input, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


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

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | NgoName>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  getNgoNames(event){
    console.log(event,"ngonameslist");
    this.options = event
  }

  displayFn(NgoName?: NgoName): string | undefined {
    return NgoName ? NgoName.name : undefined;
  }

  private _filter(name: string): NgoName[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
