import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { NgoService } from '../ngo.service';
import { Ngo } from '../shared/ngo.class';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  description: string;
  requirements: string[];
  requirement: string;//it corresponds to requirement selected by user on daonation
  contactNumber: number;
  address: string;
  ngo: Ngo;
}

@Component({
  selector: 'app-ngo-list',
  templateUrl: './ngo-list.component.html',
  styleUrls: ['./ngo-list.component.css']
})

export class NgoListComponent implements OnInit {

  @Input() citySelected: string;
  @Input() loggedInUser: string;
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
  userLoggedIn: Boolean = false;
  images: any[];
  launchMessageModal: Boolean = false;
  errorMessage: string;

  constructor(private _ngoApi: NgoService, public dialog: MatDialog) {
    this.makeImagePathList();
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

    //userLoggedInStatus
    this.checkIfUserIsLoggedIn(this.loggedInUser);

  }

  makeImagePathList() {
    this.images = [];
    for (let i = 1; i <= 14; i++) {
      this.images[i] = "app/shared/images/" + i + ".jpg";
    }
  }

  assigndata(data: any) {
    this.responseData = data;
    if (this.responseData) {
      this.ngoAvailable = [];
      this.ngoViewModel = [];
      var city;
      for (let i = 0; i < this.responseData.length; i++) {
        let ngo: Ngo = this.getNewNgo(this.responseData[i]);
        city = this.responseData[i]['city'];
        ngo.imageId = "//d:/ngomato/NgoMato/src/app/shared/images/" + i + 1 + ".jpg";
        this.ngoViewModel.push(ngo);
        let obj = { name: this.responseData[i]['name'] }
        this.ngoAvailable.push(obj);
      }
      //writing logic to add dummy ngos
      //needs to be removed after real service integration
      for (let i = 4; i <= 14; i++) {
        let ngo: Ngo = new Ngo();
        ngo.name = "NGO" + i + " " + city;
        ngo.description = 'General NGO: Working in various fields over years to help the un-priviledged';
        if (i % 2 == 0)
          ngo.requirements = ["Man Hours", "Medicines", "Food"];
        else
          ngo.requirements = ["books", "clothes", "capital"];
        this.ngoViewModel.push(ngo);
        let obj = { name: ngo.name }
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
    // ngo.description = ngoData['description'] == undefined ? 'General NGO: Working in various fields over years to help the un-priviledged' : ngoData['description'];
    ngo.description = 'General NGO: Working in various fields over years to help the un-priviledged';
    ngo.email = ngoData['email'];
    ngo.name = ngoData['name'] + " " + ngoData['city'];
    ngo.requirements = ngoData['requirements'] == undefined ? generalRequirements : ngoData['requirements'];
    return ngo;
  }

  openNgoCard(ngo: Ngo) {
    //loading NgoPage
    this.ngoSelected.emit(ngo);

  }

  modalClicked(ngoClickedForDonation: Ngo): void {

    if (this.userLoggedIn) {//launching donation Modal only if user is logged in

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

    } else {
      //pop-up a message to log-in to make donations
      this.errorMessage = "Please log-in to make donations";
      this.launchMessageModal = true;
    }

  }

  checkIfUserIsLoggedIn(loggedInUser: string) {
    if (loggedInUser != 'admin' && loggedInUser != 'LoginFailed') {
      //some user is logged in
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  onClose() {
    this.launchMessageModal = false;
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
  address: string;
  contactNumber: number;
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
    submitResponse.address = this.address;
    submitResponse.contactNumber = this.contactNumber;
    this.dialogRef.close(submitResponse);
  }
}