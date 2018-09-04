import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatSnackBar } from '@angular/material';

import * as Bluebird from 'bluebird';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  public async canActivate(route: ActivatedRouteSnapshot) {
    return true
    // const roles = route.data['roles'] as Array<string>;
    // try {
    //   // Check for an already authenticated user
    //   let authUser = await this.userSelService.currentUserSubject.take(1).toPromise();
    //   if (authUser !== null) {
    //     return await this.checkRoles(roles, authUser.personnel);
    //   } else {
    //      // if no authenticated user, check for a token and get the user
    //      const isAuthenticated = await this.auth.isAuthenticated(false);
    //      if (isAuthenticated === true) {
    //       authUser = await this.userSelService.currentUserSubject.take(1).toPromise();
    //         return await this.checkRoles(roles, authUser.personnel);
    //      } else {
    //        // No authenticated user and no valid token, so are sent to login
    //        this.router.navigate(['login']);
    //        this.snackBar.open('You must be logged in to continue', 'close', {
    //          duration: 3000
    //        });
    //        return false;
    //      }
    //   }
    // } catch (err) {
    //   this.snackBar.open('You are not authorized to access this page', 'close', {
    //     duration: 3000
    //   });
    //   return false;
    // }
  }

  private async checkRoles(roles, personnel) {
    try {
      // check roles
      const matchingRoles = await Bluebird.filter(personnel.roles, (r) => {
        return roles.indexOf(r.name) !== -1;
      });

      if (matchingRoles.length === roles.length) {
        return true;
      } else {
        throw Error('not authorized');
      }
    } catch (err) {
      throw err;
    }
  }
}
