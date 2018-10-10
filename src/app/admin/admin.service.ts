import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as Bluebird from 'bluebird';
import { environment } from '../../environments/environment';
import { CompetitionBuilder } from '../competition/competition.builder';
import { Competition } from '../competition/competition';
import { Team } from '../team/team';
import { TeamBuilder } from '../team/team.builder';
import { Player } from '../player/player';
import { PlayerBuilder } from '../player/player.builder';
import { FixtureBuilder } from '../fixture/fixture.builder';
import { Fixture } from '../fixture/fixture';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    private competitionBuilder: CompetitionBuilder,
    private teamBuilder: TeamBuilder,
    private playerBuilder: PlayerBuilder,
    private fixtureBuilder: FixtureBuilder
  ) {}

  public async createCompetition(data: any): Promise<Competition> {
    try {
      let response = await this.http.post(
        `${environment.apiUrl}admin/competitions`,
        {
          competition: {
            name: data.name
          }
        }
      ).toPromise();
      return this.competitionBuilder.create(response['data']['competition']);
    } catch (err) {
      return Promise.reject(Error('There was a problem creating this competition.'));
    }
  }

  public async createTeam(id: number, data: any): Promise<Team> {
    try {
      let response = await this.http.post(
        `${environment.apiUrl}admin/competitions/${id}/teams`,
        {
          team: data
        }
      ).toPromise();
      return this.teamBuilder.create(response['data']['team']);
    } catch (err) {
      return Promise.reject(Error('There was a problem creating this team.'));
    }
  }

  public async createTeamPlayers(id: number, data: any): Promise<Player[]> {
    try {
      let response = await this.http.post(
        `${environment.apiUrl}admin/teams/${id}/players`,
        {
          players: data
        }
      ).toPromise();
      return await Bluebird.map(response['data']['players'], async (p) => {
        return this.playerBuilder.create(p);
      })
    } catch (err) {
      return Promise.reject(Error('There was a problem creating players.'));
    }
  }

  public async createFixture(data: any): Promise<Fixture> {
    try {
      let response = await this.http.post(
        `${environment.apiUrl}admin/fixtures`,
        data
      ).toPromise();
      return this.fixtureBuilder.create(response['data']['fixture']);
    } catch (err) {
      return Promise.reject(Error('There was a problem creating this fixture.'));
    }
  }


}
