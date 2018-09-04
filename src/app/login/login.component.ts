import { fadeInAnimation } from './../shared/animations/fade-in';
import { LoginForm } from './login-form';
import { Component, Input, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatProgressBar } from '@angular/material';

@Component({
  selector: 'app-login',
  styleUrls: ['login.component.scss'],
  templateUrl: 'login.component.html',
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {
  public isNotLoading = true;
  public loginForm: LoginForm;

  constructor(public auth: AuthenticationService, public router: Router,
              private fb: FormBuilder, public snackBar: MatSnackBar) {
    this.loginForm = new LoginForm(fb);
  }

  public ngOnInit() {
    console.log('hello `Login` component');
  }

  @HostListener('document:keydown.enter', ['$event'])
  public keypress(e: KeyboardEvent) {
    this.doLogin();
  }

  public async doLogin() {
    this.isNotLoading = false;
    try {

      const result = await this.loginForm.validate(this.snackBar);
      if (!result) { return; }

      await this.auth.login(result.username, result.password);

      this.snackBar.open('You have successfully logged in', '', {
        duration: 3000
      });
      this.router.navigate(['/dashboard']);

    } catch {
      this.snackBar.open('There was a problem logging in, please try again', '', {
        duration: 3000
      });
    } finally {
      this.isNotLoading = true;
    }
  }

}
