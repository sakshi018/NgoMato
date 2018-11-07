import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.component.service';
import { NgoMatoDataService } from './../shared/ngoMatoDataService.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private historyService: HistoryService, private ngoMatoDatService: NgoMatoDataService) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.historyService.fetchDonationStatus(this.ngoMatoDatService.currentUser).subscribe((data) => {

      console.log("history ", data);
    });
  }

}
