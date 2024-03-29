import * as Bluebird from 'bluebird';
import { Team } from '../team/team';

export class Competition {

  public id: number = null;
  public name: string = '';
  public currentGameweek: number = 1;
  public currentSeason: number = 1;
  public createdAt: Date = null;
  public updatedAt: Date = null;
  public teams: Team[] = [];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.currentGameweek = data.currentGameweek;
    this.currentSeason = data.currentSeason;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
