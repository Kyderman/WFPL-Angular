
import { User } from '../../user/user';
import { Component, Input, OnInit, OnChanges, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { MatSidenav, MatSnackBar, MatDialog } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'top-nav',
  styleUrls: ['top-nav.component.scss'],
  templateUrl: 'top-nav.component.html'
})
export class TopNavComponent implements OnInit {
  @Input() public sidenav: MatSidenav;
  public user: User = null;
  public account: Account = null;
  public isReady: Boolean = false;

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  public async ngOnInit() {
    console.log('hello `Top Nav` component');
    // this.userSelService.currentUserSubject.subscribe((u) => {
    //   this.user = u;
    // });
    // this.accSelService.currentAccountSubject.subscribe((a) => {
    //   this.account = a;
    // });
    this.isReady = true;
  }

  public async doLogout() {
    this.sidenav.close();
    await this.auth.logout();
  }




}
