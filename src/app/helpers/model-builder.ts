
import { User } from './../user/user';

export class ModelBuilder {



  public static async createUser(d): Promise<User> {
    return new User(d);
    // const user = await new User(
    //   d.id, d.username
    // );

    // if (d.personnel !== undefined) {
    //   user.personnel = await this.createPersonnel(d.personnel);
    // }

    // return user;
  }


}
