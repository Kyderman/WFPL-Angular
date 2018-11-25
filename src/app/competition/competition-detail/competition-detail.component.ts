import { Component, OnInit } from '@angular/core';
import { Competition } from '../competition';
import { PublicService } from '../../public.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../team/team';

@Component({
  selector: 'competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.scss']
})
export class CompetitionDetailComponent implements OnInit {

  public competition: Competition = new Competition({});
  public teams: Team[] = [];

  constructor(
    public publicService: PublicService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  public async ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.competition = await this.publicService.getCompetition(p.id);
      this.teams = await this.publicService.getCompetitionTeams(p.id);
      let t = await this.publicService.lookupCompetitionGameweekAndFixturesByDate(
        this.competition.id,
        new Date('08/28/2018')
      );
      console.log(t)
    })
  }

  public async addClub() {
    this.router.navigate(['admin/competitions', this.competition.id, 'clubs', 'new']);
  }

  public async goToTeam(team: Team) {
    this.router.navigate(['clubs', team.id]);
  }

}
