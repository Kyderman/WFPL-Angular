import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { interval } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';
import { fadeInAnimation } from './shared/animations/fade-in';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 'wfplAngular';

  constructor(
    public swUpdate: SwUpdate,
    public snackBar: MatSnackBar,
    public authService: AuthenticationService
  ) {}

  public async ngOnInit() {

      // service worker update logic
    this.swUpdate.available.subscribe(event => {
      const snackBarRef = this.snackBar.open('A new update is available', 'UPDATE');
      snackBarRef.onAction().subscribe(() => {
        this.swUpdate.activateUpdate().then(() => window.location.reload());
      });
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    this.swUpdate.checkForUpdate();

    interval(1000 * 60).subscribe(() => {
      this.swUpdate.checkForUpdate();
    });

    // Initial authentication check and token checking start
    try {
      await this.authService.isAuthenticated(true);
    } catch (err) {
      this.snackBar.open(err, 'close', {
        duration: 3000
      });
    } finally {
      // this.isReady = true;
    }

  }
}
