
import * as Bluebird from 'bluebird';
import { Injectable } from '@angular/core';
import { Team } from '../team/team';
import { FantasyTeam } from './fantasyTeam';
import { Player } from '../player/player';

@Injectable()
export class FantasyTeamBuilder {
  public async create(d): Promise<FantasyTeam> {
    try {
      let players = d.players;
      let fantasyTeam = new FantasyTeam(d);
      if(players !== undefined && players.length > 0) {
        let playerObj = await Bluebird.each(players, async (p) => {
          return new Player(p);
        })
        fantasyTeam.players = playerObj;
      }
      return fantasyTeam;
    } catch(err) {
      throw Error(err);
    }
  }
}
