import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

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
  @Input() launchSingUpId:any;
  
  constructor() {
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
      this.loginModalEvent.emit(this.username);
    }
    else {
      //loginFailed
      this.loginModalEvent.emit('LoginFailed')
    }
  }
}


