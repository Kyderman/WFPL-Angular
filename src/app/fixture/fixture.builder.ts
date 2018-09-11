
import * as Bluebird from 'bluebird';
import { Injectable } from '@angular/core';
import { Fixture } from './fixture';

@Injectable()
export class FixtureBuilder {
  public async create(d): Promise<Fixture> {
    try {
      return new Fixture(d);
    } catch(err) {
      throw Error(err);
    }
  }
}
