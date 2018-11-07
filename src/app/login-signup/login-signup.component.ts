import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { NgoMatoDataService } from './../shared/ngoMatoDataService.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  hide = true;
  username: string;
  password: string;
  credentials: Map<string, string>;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  @Output() loginModalClosed: EventEmitter<any> = new EventEmitter();
  @Output() loginModalEvent: EventEmitter<any> = new EventEmitter();
  @Input() launchSingUpId: any;

  constructor(public snackBar: MatSnackBar, private ngoMatoDataService: NgoMatoDataService) {
    this.credentials = new Map<string, string>();
    this.credentials['sakshi'] = 'ngo1';
    this.credentials['prakhar'] = 'ngo2';
    this.credentials['admin'] = 'master';
  }

  ngOnInit() {
  }

  onClose() {
    this.loginModalClosed.emit();
  }

  loginClicked() {

    //service call to verify user credentials is made
    if (this.credentials[this.username] == this.password) {
      //loginSuccessfull
      this.openSnackBar("Login SuccessFul", "");
      this.loginModalEvent.emit(this.username);
      this.ngoMatoDataService.currentUser = this.username;
    }
    else {
      //loginFailed
      this.openSnackBar("LoginFailed", "Try Again");
      this.loginModalEvent.emit('LoginFailed');
      this.ngoMatoDataService.currentUser = "LoginFailed";//NoUser
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


