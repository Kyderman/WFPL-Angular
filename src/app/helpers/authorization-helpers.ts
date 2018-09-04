import * as Bluebird from 'bluebird';
export class AuthorizationHelpers {

  public static async checkRoles(roles, personnel) {
    // check roles
    const matchingRoles = await Bluebird.filter(personnel.roles, (r) => {
      return roles.indexOf(r.name) !== -1;
    });

    if (matchingRoles.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
