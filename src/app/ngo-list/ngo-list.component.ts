import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { NgoService } from '../ngo.service';
import { Ngo } from '../shared/ngo.class';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  description: string;
  requirements: string[];
  requirement: string;//it corresponds to requirement selected by user on daonation
  ngo: Ngo;
}

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
  description: string;
  requirement: string
  requirements: string[];
  donationForNGO: Ngo;
  images : any[];

  constructor(private _ngoApi: NgoService, public dialog: MatDialog) {
    this.images = ["app/shared/images/1.jpg", "app/shared/images/2.jpg","app/shared/images/3.jpg"]
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
        ngo.imageId = "//d:/ngomato/NgoMato/src/app/shared/images/" + i + 1 + ".jpg";
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

  openNgoCard(ngo: Ngo) {
    //loading NgoPage
    this.ngoSelected.emit(ngo);

  }

  modalClicked(ngoClickedForDonation: Ngo): void {

    this.donationForNGO = ngoClickedForDonation;
    this.requirements = ngoClickedForDonation.requirements;
    const dialogRef = this.dialog.open(DialogBox, {
      width: '450px',
      data: { description: this.description, requirements: this.requirements, ngo: this.donationForNGO }

    });

    dialogRef.afterClosed().subscribe(result => {
      this.description = result.description;
      this.requirement = result.requirement;
    });

  }

}

@Component({
  selector: 'ngoDialogBox',
  templateUrl: 'ngoDialogBox.component.html'
})
export class DialogBox {

  description: string;
  requirement: string;
  requirements: any[];
  ngo: Ngo;

  constructor(public dialogRef: MatDialogRef<DialogBox>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.ngo = this.data.ngo;
    this.requirements = this.data.requirements;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitDonations() {
    let submitResponse = {} as DialogData;

    submitResponse.ngo = this.ngo;
    submitResponse.description = this.description;
    submitResponse.requirement = this.requirement;
    this.dialogRef.close(submitResponse);
  }
}