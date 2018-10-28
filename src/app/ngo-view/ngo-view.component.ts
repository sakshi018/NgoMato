import { Component, OnInit, Input } from '@angular/core';
import { Ngo } from '../shared/ngo.class';

@Component({
  selector: 'app-ngo-view',
  templateUrl: './ngo-view.component.html',
  styleUrls: ['./ngo-view.component.css']
})
export class NgoViewComponent implements OnInit {

  @Input() ngoIdToLoad: Ngo;
  image:string;
  
  constructor() { }

  ngOnInit() {

    this.image = this.ngoIdToLoad.imageId;
    console.log("",this.ngoIdToLoad.imageId);
    
  }

}
