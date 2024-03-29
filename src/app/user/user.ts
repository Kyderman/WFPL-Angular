import { Role } from "../role/role";
import * as Bluebird from 'bluebird';

export class User {

  public id: number = null;
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public createdAt: Date = null;
  public updatedAt: Date = null;
  public roles: Role[] = [];

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public async isAdmin() {
    let a = await Bluebird.any(this.roles, async (r) => {
      r.name === 'Admin';
    })
    return a.length !== null;
  }

}
