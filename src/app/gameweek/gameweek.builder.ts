
import * as Bluebird from 'bluebird';
import { Injectable } from '@angular/core';
import { Gameweek } from './gameweek';

@Injectable()
export class GameweekBuilder {
  public async create(d): Promise<Gameweek> {
    try {
      return new Gameweek(d);
    } catch(err) {
      throw Error(err);
    }
  }
}
