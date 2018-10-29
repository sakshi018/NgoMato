import { Component, OnInit, Input } from '@angular/core';
import { Ngo } from '../shared/ngo.class';

@Component({
  selector: 'app-ngo-view',
  templateUrl: './ngo-view.component.html',
  styleUrls: ['./ngo-view.component.css']
})
export class NgoViewComponent implements OnInit {

  @Input() ngoIdToLoad: Ngo;
  image1: string;
  image2: string;
  mainScreen: boolean = true;
  subScreens: boolean = false;
  breakpoint: any;


  constructor() { }

  ngOnInit() {

    this.image1 = this.ngoIdToLoad.imageId;
    this.image2 = "app/shared/images/" + 8 + ".jpg";
    this.breakpoint = (window.innerWidth <= 414) ? 1 : 3;

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 414) ? 1 : 3;
  }


}
