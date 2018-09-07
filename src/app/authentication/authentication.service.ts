import { MatDialog, MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as Bluebird from 'bluebird';
import { Subscription, BehaviorSubject, timer } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { RefreshDialogComponent } from './refresh-dialog/refresh-dialog.component';
import { UserBuilder } from '../user/user.builder';

@Injectable()
export class AuthenticationService {
  public currentUserSubject = new BehaviorSubject<User>(null);
  public tokenCheckSub: Subscription;

  constructor(
    private http: HttpClient,
    public router: Router,
    public jwtHelper: JwtHelperService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public userService: UserService,
    public userBuilder: UserBuilder
  ) { }

  public async isAuthenticated(isTokenCheck) {
    try {
      let token = await this.jwtHelper.tokenGetter();
      if (token !== null) {

          await this.jwtHelper.isTokenExpired(token);
          let decoded = await this.jwtHelper.decodeToken(token);
          let user = await this.userService.getUser(decoded.user.id);
          this.currentUserSubject.next(user);
          if (isTokenCheck === true) {
            this.tokenCheck(decoded);
          }
          return true;
      } else {
        this.purgeAuth();
        return false;
      }
    } catch (err) {
      this.purgeAuth();
      return Error('User couldnt be authenticated properly');
    }
  }

  public async login(email: string, password: string): Promise<any> {
    try {
      let response = await this.http.post(`${environment.apiUrl}login`,
        JSON.stringify({
          email,
          password
        }), {
          headers: new HttpHeaders().set('Content-type', 'application/json'),
        }).toPromise();
      let user = await this.userBuilder.create(response['data']['user']);
      this.currentUserSubject.next(user);
      let token = response['data']['token'];
      this.setToken(token);
      this.tokenCheck(this.jwtHelper.decodeToken(token));
    } catch (err) {
      console.log(err)
      return Promise.reject(Error('There was a problem logging in, please try again.'));
    }
  }

  public async logout(): Promise<any> {
    try {
      await this.http.get(`${environment.apiUrl}logout`).toPromise();
    } catch (err) {
      console.log(err);
    } finally {
      this.purgeAuth();
      this.tokenCheckSub.unsubscribe();
      this.router.navigate(['/']);
      this.snackBar.open('Successfully logged out', null, {
        duration: 3000
      });
    }
  }

  public async refreshToken(): Promise<any> {
    try {
      let response = await this.http.get(`${environment.apiUrl}refresh`).toPromise();
      this.tokenCheckSub.unsubscribe();
      this.setToken(response['data']['token']);
      let token = this.jwtHelper.tokenGetter();
      let decoded = await this.jwtHelper.decodeToken(token);
      this.tokenCheck(decoded);
    } catch (err) {
      this.purgeAuth();
      this.tokenCheckSub.unsubscribe();
      this.router.navigate(['login']);
      return Error('There was a problem refreshing your token, please login again');
    }
  }

  public async tokenCheck(token) {
    let exp = new Date(token['exp'] * 1000);
    let now = new Date();
    let timeout = 30000;

    if (this.tokenCheckSub === undefined || this.tokenCheckSub.closed) {
      let dialogTime = timeout;
      let timeToExpire = exp.getTime() - now.getTime() + 10000;
      let timeToDialog = timeToExpire - timeout;
      if (timeToExpire < 10000) {
        return await this.logout();
      } else if (timeToExpire < dialogTime) {
        dialogTime = timeToExpire;
      }
      this.tokenCheckSub = timer(timeToDialog)
        .subscribe(() => {
          // cause check for whether a refresh token is wanted
          let dialogRef = this.dialog.open(RefreshDialogComponent, {
            width: '500px',
            disableClose: true,
            data: { timeLeft: dialogTime }
          });
          dialogRef.afterClosed().subscribe((res) => {
            if (res === true) {
              this.refreshToken();
            } else {
              this.logout();
            }
          });
        });
    } else {
      if (exp.getTime() - now.getTime() < timeout) {
        return await this.logout();
      }
    }
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public purgeAuth(): void {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
  }

}
