
import * as Bluebird from 'bluebird';
import { Injectable } from '@angular/core';
import { Gameweek } from './gameweek';
import { Fixture } from '../fixture/fixture';

@Injectable()
export class GameweekBuilder {
  public async create(d): Promise<Gameweek> {
    try {
      let fixtures = d.fixtures;
      let gameweek = new Gameweek(d);
      if (d.fixtures !== undefined && d.fixtures.length > 0) {
        let fixObj = await Bluebird.each(fixtures, async (f) => {
          return new Fixture(f);
        })
        gameweek.fixtures = fixObj;
        return gameweek;
      }
    } catch(err) {
      throw Error(err);
    }
  }
}
