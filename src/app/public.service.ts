import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as Bluebird from 'bluebird';
import { environment } from '../environments/environment';
import { CompetitionBuilder } from './competition/competition.builder';
import { Competition } from './competition/competition';

@Injectable()
export class PublicService {

  constructor(
    private http: HttpClient,
    private competitionBuilder: CompetitionBuilder
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


}
