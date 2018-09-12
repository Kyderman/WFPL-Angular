import * as Bluebird from 'bluebird';
import { Injectable } from '@angular/core';
import { Team } from './team';

@Injectable()
export class TeamBuilder {
  public async create(d): Promise<Team> {
    try {
      return new Team(d);
    } catch(err) {
      throw Error(err);
    }
  }
}
