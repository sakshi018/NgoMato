import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgoService } from '../ngo.service';
import { Ngo } from './../shared/Ngo.class';




@Component({
  selector: 'app-ngo-list',
  templateUrl: './ngo-list.component.html',
  styleUrls: ['./ngo-list.component.css']
})


export class NgoListComponent implements OnInit {

  @Input() citySelected: string;
  @Output() ngoNames: EventEmitter<any> = new EventEmitter();
  @Output() ngoSelected: EventEmitter<any> = new EventEmitter();
  ngoAvailable: any[];
  responseData: any = [];
  ngoViewModel: Ngo[];
  message: string;


  constructor(private _ngoApi: NgoService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {

    let body = {
      "city": this.citySelected
    };

    this._ngoApi.getAllNGO(body)
      .subscribe(
        data => {
          console.log("response from service ", data);
          if (data != null || data != undefined) {
            this.assigndata(data);
          }
          else {
            this.message = "Some Internal Error, please try after some time"
          }
        }
      );

  }

  assigndata(data: any) {
    this.responseData = data;
    if (this.responseData) {
      this.ngoAvailable = [];
      this.ngoViewModel = [];
      for (let i = 0; i < this.responseData.length; i++) {
        let ngo: Ngo = this.getNewNgo(this.responseData[i]);
        ngo.imageId = "//d:/ngomato/NgoMato/src/app/shared/images/"+i+1+".jpg";
        this.ngoViewModel.push(ngo);
        let obj = { name: this.responseData[i]['name'] }
        this.ngoAvailable.push(obj);
      }
    }

    this.ngoNames.emit(this.ngoAvailable);
  }

  getNewNgo(ngoData: any): Ngo {
    let ngo: Ngo = new Ngo();//making new object of ngo
    let generalRequirements: string[] = ['funds', 'primary books', 'stationary'];
    ngo.address = ngoData['address'];
    ngo.category = ngoData['category'];
    ngo.city = ngoData['city'];
    ngo.description = ngoData['description'] == undefined ? 'General NGO: Working in various fields over years to help the un-priviledged' : ngoData['description'];
    ngo.email = ngoData['email'];
    ngo.name = ngoData['name'];
    ngo.requirements = ngoData['requirements'] == undefined ? generalRequirements : ngoData['requirements'];
    return ngo;
  }

  openNgoCard(ngo:Ngo){
    //loading NgoPage
    this.ngoSelected.emit(ngo);

  }

}
