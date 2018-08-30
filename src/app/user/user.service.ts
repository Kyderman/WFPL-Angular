import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Injectable } from '@angular/core';

import * as Bluebird from 'bluebird';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  public async getUser(id: number): Promise<any> {
    try {
      let response = await this.http.get(
        `${environment.apiUrl}users/${id}`
      ).toPromise();
      let user = new User(response['data']['user']);
      return user;
    } catch (err) {
      return Promise.reject(Error('There was a problem retrieving this user.'));
    }
  }


}
