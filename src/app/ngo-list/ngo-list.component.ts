import { Component, OnInit , Input, EventEmitter,Output} from '@angular/core';
import {NgoService} from '../ngo.service'
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
@Component({
  selector: 'app-ngo-list',
  templateUrl: './ngo-list.component.html',
  styleUrls: ['./ngo-list.component.css']
})


export class NgoListComponent implements OnInit {

  @Input() citySelected : string;
 
  @Output() ngoNames: EventEmitter<any> = new EventEmitter();


  ngoAvailable:any[];
  responseData = [];

  ngOnChanges() {
  
    let body = { 
      "city" : this.citySelected
    };
    this._ngoApi.getAllNGO(body)
    .subscribe(
      data=>{
        console.log(data);
        this.assigndata(data);}
    );

  }

  assigndata(data){
    this.responseData = data;
    
    if(this.responseData)
    {
      this.ngoAvailable = [];
      for(let i=0;i<this.responseData.length;i++){
       let obj = {name : this.responseData[i]['name']}
      this.ngoAvailable.push(obj );
    }
    }
    
    this.ngoNames.emit(this.ngoAvailable);
  }

  

  constructor(private _ngoApi : NgoService) { 
    
  }

  ngOnInit() {
  }

}
