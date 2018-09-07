
import * as Bluebird from 'bluebird';
import { Injectable } from '@angular/core';
import { Competition } from './competition';
import { Team } from '../team/team';

@Injectable()
export class CompetitionBuilder {
  public async create(d): Promise<Competition> {
    try {
      let teams = d.teams;
      let competition = new Competition(d);
      if(d.teams !== undefined && d.teams.length > 0) {
        let teamObj = await Bluebird.each(teams, async (t) => {
          return new Team(t);
        })
        competition.teams = teamObj;
      }
      return competition;
    } catch(err) {
      throw Error(err);
    }
  }
}
