
import { User } from '../../user/user';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { MatSidenav, MatDialog } from '@angular/material';

@Component({
  selector: 'top-nav',
  styleUrls: ['top-nav.component.scss'],
  templateUrl: 'top-nav.component.html'
})
export class TopNavComponent implements OnInit {
  @Input() public sidenav: MatSidenav;
  public user: User = null;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public dialog: MatDialog,
  ) {}

  public async ngOnInit() {
    console.log('hello `Top Nav` component');
    this.authService.currentUserSubject.subscribe((u) => {
      this.user = u;
    });
  }

  public async doLogout() {
    this.sidenav.close();
    await this.authService.logout();
  }




}
