import * as Bluebird from 'bluebird';

export class Player {

  public id: number = null;
  public firstName: string = '';
  public lastName: string = '';
  public currentSeasonPoints: number = 0;
  public currentValue: number = 0;
  public createdAt: Date = null;
  public updatedAt: Date = null;

  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.currentSeasonPoints = data.currentSeasonPoints;
    this.currentValue = data.currentValue;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
