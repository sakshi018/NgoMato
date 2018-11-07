import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.component.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private historyService: HistoryService) { }

  ngOnInit() {

    this.historyService.fetchDonationStatus("prakhar").subscribe((data) => {
      console.log("history ", data);
    });
  }

}
