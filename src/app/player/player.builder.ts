
import * as Bluebird from 'bluebird';
import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable()
export class PlayerBuilder {
  public async create(d): Promise<Player> {
    try {
      return new Player(d);
    } catch(err) {
      throw Error(err);
    }
  }
}
