import { Component, OnInit } from '@angular/core';
import {NgoService} from '../ngo.service'
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
@Component({
  selector: 'app-ngo-list',
  templateUrl: './ngo-list.component.html',
  styleUrls: ['./ngo-list.component.css']
})
export class NgoListComponent implements OnInit {

  constructor(private _ngoApi : NgoService) { 
    this._ngoApi.getAllNGO().subscribe(data=>console.log());
  }

  ngOnInit() {
  }

}
