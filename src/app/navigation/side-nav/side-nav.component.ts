import { AuthorizationHelpers } from './../../helpers/authorization-helpers';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'side-nav',
  styleUrls: ['side-nav.component.scss'],
  templateUrl: 'side-nav.component.html'
})
export class SideNavComponent implements OnInit {
  public isAdmin: Boolean = false;

  constructor(
    public router: Router,
    public authService: AuthenticationService
  ) {}

  public async ngOnInit() {
    console.log('hello `Side Nav` component');
    this.authService.currentUserSubject.subscribe(async (u) => {
      if (u !== null) {
        this.isAdmin = await u.isAdmin();
      }
    });
    // this.accSelService.currentAccountSubject.subscribe(async (a) => {
    //   this.currentAccount = a;
    // });
  }
}
