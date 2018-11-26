import { Component, OnInit } from '@angular/core';
import { Competition } from '../competition';
import { PublicService } from '../../public.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../team/team';
import { Gameweek } from 'src/app/gameweek/gameweek';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.scss']
})
export class CompetitionDetailComponent implements OnInit {

  public competition: Competition = new Competition({});
  public teams: Team[] = [];
  public currentGameweek$: BehaviorSubject<Gameweek> = new BehaviorSubject<Gameweek>(new Gameweek({}));
  public currentGameweek: Gameweek = new Gameweek({})

  constructor(
    public publicService: PublicService,
    public route: ActivatedRoute,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  public async ngOnInit() {
    this.currentGameweek$.subscribe(async (g) => {
      console.log(g)
      this.currentGameweek = g;
    })
    this.route.params.subscribe(async (p) => {
      this.competition = await this.publicService.getCompetition(p.id);
      this.teams = await this.publicService.getCompetitionTeams(p.id);
      this.currentGameweek$.next(await this.publicService.lookupCompetitionGameweekAndFixturesByDate(
        this.competition.id,
        new Date('08/28/2018')
      ));

    })
  }

  public async addClub() {
    this.router.navigate(['admin/competitions', this.competition.id, 'clubs', 'new']);
  }

  public async goToTeam(team: Team) {
    this.router.navigate(['clubs', team.id]);
  }

  public async forwardGameweek() {
    // get gameweek and fixtures + 1
    let g = await this.publicService.lookupGameweek(this.competition.id, this.currentGameweek.weekNumber + 1);
    if (g === null) {
      this.snackBar.open('Next gameweek not available', '', {
        duration: 3000
      });
    } else {
      this.currentGameweek$.next(g);
    }

  }

  public async backGameweek() {
    let g = await this.publicService.lookupGameweek(this.competition.id, this.currentGameweek.weekNumber - 1);
    if (g === null) {
      this.snackBar.open('Previous gameweek not available', '', {
        duration: 3000
      });
    } else {
      this.currentGameweek$.next(g);
    }
  }

}
