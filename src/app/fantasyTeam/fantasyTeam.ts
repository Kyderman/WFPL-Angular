export class FantasyTeam {

  public id: number = null;
  public name: string = '';
  public totalPoints: number = null;
  public totalValue: number = null;
  public userId: number = null;
  public leaguePosition: number = null;
  public competitionId: number = null;
  public season: number = null;
  public isPrivate: boolean = false;
  public createdAt: Date = null;
  public updatedAt: Date = null;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.totalPoints = data.totalPoints;
    this.totalValue = data.totalValue;
    this.userId = data.userId;
    this.leaguePosition = data.leaguePosition;
    this.competitionId = data.competitionId;
    this.season = data.season;
    this.isPrivate = data.isPrivate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
