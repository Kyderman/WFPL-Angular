import { Component, OnInit, ViewChild } from '@angular/core';
import { FixtureCreationForm } from '../fixture-creation-form';
import { FormBuilder, FormControl } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { MatSnackBar, MatInput } from '@angular/material';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerForm } from '../../player/player-form';
import { Location } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { PublicService } from '../../public.service';
import { BehaviorSubject } from 'rxjs';
import { Team } from '../../team/team';
import { Competition } from '../../competition/competition';
import { Gameweek } from '../../gameweek/gameweek';
import { GameweekForm } from '../../gameweek/gameweek-form';

@Component({
  selector: 'fixture-creation-form',
  templateUrl: './fixture-creation-form.component.html',
  styleUrls: ['./fixture-creation-form.component.scss']
})
export class FixtureCreationFormComponent implements OnInit {

  public isReady: boolean = false;
  public isLoading: boolean = false;
  public fixtureForm: FixtureCreationForm;
  public fixtureTypes: string[] = [];

  public filteredTeams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

  public filteredCompetitions: BehaviorSubject<Competition[]> = new BehaviorSubject<Competition[]>([]);
  public selectedCompetition: Competition;

  public competitionSelector: FormControl = new FormControl('');

  public matchingCompetitonGameweek: Gameweek;


  public existingGameweeksList: Gameweek[] = [];

  public gameweekForm: GameweekForm;

  public existingSelectedGameweeks: Gameweek[] = [];
  public newSelectedGameweeks: Gameweek[] = [];


  constructor (
    public fb: FormBuilder,
    public adminService: AdminService,
    public snackBar: MatSnackBar,
    public appService: AppService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    public publicService: PublicService
  ) {}

  public async ngOnInit() {
    console.log('Loaded Player New');
    this.fixtureForm = new FixtureCreationForm(this.fb);
    this.fixtureTypes = await this.appService.getFixtureTypeStrings();
    
    this.competitionSelector.valueChanges.pipe(
      debounceTime(400))
      .subscribe(async (value) => {
        this.selectedCompetition = null;
        if (value === '') {
          value = null;
        } else if (value instanceof Competition) {
          this.selectedCompetition = value;
          this.matchingCompetitonGameweek = await this.publicService.lookupCompetitionGameweeks(this.selectedCompetition.id, new Date(this.fixtureForm.form.controls['fixtureDate'].value))
          console.log(this.matchingCompetitonGameweek)
          return;
        }

        const competitions = await this.publicService.lookupCompetitions(value, 5);
        // if (this.existingPersonnelList.length !== 0) {
        //   r.users = await Bluebird.filter(r.users, async (p) => {
        //     return await this.existingPersonnelList.some(p2 => p2.id !== p.id);
        //   });
        // }
        this.filteredCompetitions.next(competitions);
      });
    this.fixtureForm.form.controls['homeTeamId'].valueChanges.pipe(
      debounceTime(400))
      .subscribe(async (value) => {
        if (value === '') {
          value = null;
        }
        const teams = await this.publicService.lookupTeams(value, 5);
        // if (this.existingPersonnelList.length !== 0) {
        //   r.users = await Bluebird.filter(r.users, async (p) => {
        //     return await this.existingPersonnelList.some(p2 => p2.id !== p.id);
        //   });
        // }
        this.filteredTeams.next(teams);
      });

    this.fixtureForm.form.controls['awayTeamId'].valueChanges.pipe(
      debounceTime(400))
      .subscribe(async (value) => {
        if (value === '') {
          value = null;
        }
        const teams = await this.publicService.lookupTeams(value, 5);
        // if (this.existingPersonnelList.length !== 0) {
        //   r.users = await Bluebird.filter(r.users, async (p) => {
        //     return await this.existingPersonnelList.some(p2 => p2.id !== p.id);
        //   });
        // }
        this.filteredTeams.next(teams);
      });
  }

  public async onSubmit() {
    this.isLoading = true;
    try {
      let formResult = await this.fixtureForm.submit(this.snackBar);
      if(formResult !== false) {
        console.log(formResult);
        // let team = await this.adminService.createTeamPlayers(this.teamId, [formResult]);
        // this.snackBar.open('Player successfully created', '', {
        //   duration: 3000
        // })
        // // relocate to the team dashboard
        // this.router.navigate(['clubs', this.teamId]);
      }
    } catch(err) {
      this.snackBar.open(err, '', {
        duration: 3000
      })
    } finally {
      this.isLoading = false;
    }

  }

  public onCancel() {
    this.location.back();
  }

  public teamDisplay(t?: Team): string | undefined {
    return t ? t.name : undefined;
  }

  public competitionDisplay(c?: Competition): string | undefined {
    return c ? c.name : undefined;
  }

}
