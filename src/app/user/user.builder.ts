
import { User } from './../user/user';
import * as Bluebird from 'bluebird';
import { Role } from '../role/role';
import { Injectable } from '@angular/core';

@Injectable()
export class UserBuilder {
  public async create(d): Promise<User> {
    try {
      let roles = d.roles;
      let user = new User(d);
      if(d.roles !== undefined && d.roles.length > 0) {
        let roleObj = await Bluebird.each(roles, async (r) => {
          return new Role(r);
        })
        user.roles = roleObj;
      }
      return user;
    } catch(err) {
      throw Error(err);
    }
  }
}
