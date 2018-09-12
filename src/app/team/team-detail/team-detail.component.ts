import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { Player } from '../../player/player';
import { PublicService } from '../../public.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public team: Team = new Team({});
  public players: Player[] = [];

  constructor(
    public publicService: PublicService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  public async ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.team = await this.publicService.getTeam(p.id);
      // this.teams = await this.publicService.getCompetitionTeams(p.id)
    })
  }

  public async addPlayer() {
    // this.router.navigate(['admin/competitions', this.competition.id, 'clubs', 'new']);
  }

}
