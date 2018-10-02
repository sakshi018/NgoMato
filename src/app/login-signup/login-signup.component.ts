import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  @Output() loginModalClosed: EventEmitter<any> = new EventEmitter();
  @Output() loginModalEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.credentials = new Map<string,string>();
    this.credentials['sakshi'] = 'ngo1';
    this.credentials['prakhar'] = 'ngo2';
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
      this.loginModalEvent.emit(this.username);
    }
    else {
      //loginFailed
      this.loginModalEvent.emit('LoginFailed')
    }
  }
}


