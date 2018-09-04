
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AntiAuthGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true
    // try {
    //   // Check for an already authenticated user
    //   const authPersonnel = await this.userSelService.currentUserSubject.take(1).toPromise();
    //   if (authPersonnel != null) {
    //     this.snackBar.open('You are already logged in', 'close', {
    //       duration: 3000
    //     });
    //     return false;
    //   } else {
    //     // if no authenticated user, check for a token and get the user
    //     const isAuthenticated = await this.auth.isAuthenticated(false);
    //     if (isAuthenticated === true) {
    //       this.snackBar.open('You are already logged in', 'close', {
    //         duration: 3000
    //       });
    //       return false;
    //     } else {
    //       // No authenticated user and no valid token, so are allowed through
    //       return true;
    //     }
    //   }
    // } catch (err) {
    //   return true;
    // }
  }
}
