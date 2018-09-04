import { Component, Input, OnInit, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthenticationService, public router: Router) {
  }

  public ngOnInit() {
    console.log('hello `Home` component');
  }

}
