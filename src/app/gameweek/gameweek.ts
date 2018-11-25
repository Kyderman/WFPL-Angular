import { Competition } from "../competition/competition";
import { Fixture } from "../fixture/fixture";

export class Gameweek {

  public id: number = null;
  public weekNumber: number = null;
  public season: number = null;
  public competitionId: number = null;
  public startDate: Date = null;
  public endDate: Date = null;
  public createdAt: Date = null;
  public updatedAt: Date = null;
  public competition: Competition = null;
  public fixtures: Fixture[] = [];

  constructor(data: any) {
    this.id = data.id;
    this.weekNumber = data.weekNumber;
    this.season = data.season;
    this.competitionId = data.competitionId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
