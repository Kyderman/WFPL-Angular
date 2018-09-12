import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as Bluebird from 'bluebird';
import { environment } from '../environments/environment';
import { CompetitionBuilder } from './competition/competition.builder';
import { Competition } from './competition/competition';
import { TeamBuilder } from './team/team.builder';
import { Team } from './team/team';

@Injectable()
export class PublicService {

  constructor(
    private http: HttpClient,
    private competitionBuilder: CompetitionBuilder,
    private teamBuilder: TeamBuilder
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


}
