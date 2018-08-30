export class User {

  public id: number = null;
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public createdAt: Date = null;
  public updatedAt: Date = null;

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
