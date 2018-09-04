import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  public async canActivate() {
    return true
    // try {
    //   // Check for an already authenticated user
    //   const authPersonnel = await this.userSelService.currentUserSubject.take(1).toPromise();
    //   if (authPersonnel != null) {
    //    return true;
    //   } else {
    //     // if no authenticated user, check for a token and get the user
    //     const isAuthenticated = await this.auth.isAuthenticated(false);
    //     if (isAuthenticated === true) {
    //       return true;
    //     } else {
    //       // No authenticated user and no valid token, so are sent to login
    //       this.router.navigate(['login']);
    //       this.snackBar.open('You must be logged in to continue', 'close', {
    //         duration: 3000
    //       });
    //       return false;
    //     }
    //   }
    // } catch (err) {
    //   this.router.navigate(['login']);
    //   this.snackBar.open('You must be logged in to continue', 'close', {
    //     duration: 3000
    //   });
    //   return false;
    // }
  }
}
