
import { Role } from './role/role';
import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable()
export class AppService {

  public roles: Role[] = [];

  constructor (
    public media: MediaMatcher,
  ) {}

  public async getDialogMeasurements() {
    const mobileQuery = this.media.matchMedia('(max-width: 600px)');
    const browserQuery = this.media.matchMedia('(display-mode: browser)');

    let height = null;
    let width = '500px';
    let maxHeight = null;
    let maxWidth = null;

    if (mobileQuery.matches) {
      width = '100vw';
      height = '100vh';
      maxWidth = '100vw';
      maxHeight = '100vh';
      if (browserQuery.matches) {
        width = '100vw';
        height = 'calc(100vh - 56px)';
      }
    }

    return {height, width, maxHeight, maxWidth};
  }

  public async getFixtureTypes() {
    return {
      league: 'League'
    }
  }

  public async getFixtureTypeStrings() {
    return ['League']
  }

}
