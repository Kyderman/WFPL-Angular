import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as Bluebird from 'bluebird';
import { environment } from '../environments/environment';
import { CompetitionBuilder } from './competition/competition.builder';
import { Competition } from './competition/competition';
import { TeamBuilder } from './team/team.builder';
import { Team } from './team/team';
import { Player } from './player/player';
import { PlayerBuilder } from './player/player.builder';
import { GameweekBuilder } from './gameweek/gameweek.builder';
import { Gameweek } from './gameweek/gameweek';

@Injectable()
export class PublicService {

  constructor(
    private http: HttpClient,
    private competitionBuilder: CompetitionBuilder,
    private teamBuilder: TeamBuilder,
    private playerBuilder: PlayerBuilder,
    private gameweekBuilder: GameweekBuilder
  ) {}

  public async getAllCompetitions(): Promise<Competition[]> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/competitions`
      ).toPromise();
      return await Bluebird.map(response['data']['competitions'], async (c) => {
        return this.competitionBuilder.create(c);
      })
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving competitions.'));
    }
  }

  public async getCompetition(id: number): Promise<Competition> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/competitions/${id}`
      ).toPromise();
      return this.competitionBuilder.create(response['data']['competition']);
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving competition.'));
    }
  }

  public async getCompetitionTeams(id: number): Promise<Team[]> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/competitions/${id}/teams`
      ).toPromise();
      return await Bluebird.map(response['data']['teams'], async (t) => {
        return this.teamBuilder.create(t);
      })
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving teams.'));
    }
  }

  public async getTeam(id: number): Promise<Team> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/teams/${id}`
      ).toPromise();
      return this.teamBuilder.create(response['data']['team']);
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving club.'));
    }
  }

  public async getTeamPlayers(id: number): Promise<Player[]> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/teams/${id}/players`
      ).toPromise();
      return await Bluebird.map(response['data']['players'], async (p) => {
        return this.playerBuilder.create(p);
      })
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving players.'));
    }
  }

  public async getPlayer(id: number): Promise<Player> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/players/${id}`
      ).toPromise();
      return this.playerBuilder.create(response['data']['player']);
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving player.'));
    }
  }

  public async lookupTeams(name: string, limit: number): Promise<Team[]> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/lookup/teams?name=${name}&limit=${limit}`
      ).toPromise();
      return await Bluebird.map(response['data']['teams'], async (t) => {
        return this.teamBuilder.create(t);
      })
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving teams.'));
    }
  }
  public async lookupCompetitions(name: string, limit: number): Promise<Competition[]> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/lookup/competitions?name=${name}&limit=${limit}`
      ).toPromise();
      return await Bluebird.map(response['data']['competitions'], async (c) => {
        return this.competitionBuilder.create(c);
      })
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving competitions.'));
    }
  }

  public async lookupCompetitionGameweeks(competitionId: number, containsDate: Date): Promise<Gameweek> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}public/lookup/competitions/${competitionId}/gameweeks?containsDate=${containsDate}`
      ).toPromise();
      if(response['data']['gameweek'] === null) { return null }
      console.log(response)
      return this.gameweekBuilder.create(response['data']['gameweek']);
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving gameweek'));
    }
  }


}
