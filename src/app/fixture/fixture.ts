export class Fixture {

  public id: number = null;
  public fixtureType: string = '';
  public homeTeamId: number = null;
  public awayTeamId: number = null;
  public homeTeamScore: number = null;
  public awayTeamScore: number = null;
  public fixtureDate: Date = null;
  public createdAt: Date = null;
  public updatedAt: Date = null;

  constructor(data: any) {
    this.id = data.id;
    this.fixtureType = data.fixtureType;
    this.homeTeamId = data.homeTeamId;
    this.awayTeamId = data.awayTeamId;
    this.homeTeamScore = data.homeTeamScore;
    this.awayTeamScore = data.awayTeamScore;
    this.fixtureDate = data.fixtureDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

}
