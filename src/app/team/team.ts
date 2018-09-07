import * as Bluebird from 'bluebird';

export class Team {

  public id: number = null;
  public name: string = '';
  public fixtureType: string = '';
  public competitionId: number = null;
  public season: number = null;
  public createdAt: Date = null;
  public updatedAt: Date = null;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.fixtureType = data.fixtureType;
    this.competitionId = data.competitionId;
    this.season = data.season;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
