import { AuthorizationHelpers } from './../../helpers/authorization-helpers';

import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'side-nav',
  styleUrls: ['side-nav.component.scss'],
  templateUrl: 'side-nav.component.html'
})
export class SideNavComponent implements OnInit {
  public currentAccount: Account = null;
  public isAdmin: Boolean = false;

  constructor(
    public router: Router
  ) {}

  public async ngOnInit() {
    console.log('hello `Side Nav` component');
    // this.userSelService.currentUserSubject.subscribe(async (u) => {
    //   if (u !== null) {
    //     this.isAdmin = u.isAdmin();
    //   }
    // });
    // this.accSelService.currentAccountSubject.subscribe(async (a) => {
    //   this.currentAccount = a;
    // });
  }
}
