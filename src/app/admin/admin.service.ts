import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as Bluebird from 'bluebird';
import { environment } from '../../environments/environment';
import { CompetitionBuilder } from '../competition/competition.builder';
import { Competition } from '../competition/competition';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    private competitionBuilder: CompetitionBuilder
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


}
