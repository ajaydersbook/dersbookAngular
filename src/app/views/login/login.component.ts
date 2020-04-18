import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../../_services/login.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalsComponent } from '../notifications/modals.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  signinForm: FormGroup;
  authFailed = false;
  modalsComponent:ModalsComponent;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private spinner: NgxSpinnerService
  ) {
    if (authService.isLoggedIn) {
      router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    })
  }

  signin() {
    this.spinner.show();
    const signinData = this.signinForm.value;
    if (this.signinForm.value.Email && this.signinForm.value.Password) {
      //this.spinner.show();
      this.loginService.login(this.signinForm.value).subscribe(_result => {
       console.log('_result is', _result)
        if (typeof _result.Payload !== typeof undefined) {
          console.log('in if block')
          this.authService.storeToken(_result.Payload.Token);
          this.authService.storeTokenTime(_result.Payload.Expires);
          this.authService.loggedIn.next(true);
          this.router.navigate(['/dashboard']);
        }
        this.router.navigateByUrl('/');
      }, _error => {
        this.signinForm.reset();

        this.authFailed = true;

      });
      this.spinner.hide();
    }

  }

  

}
