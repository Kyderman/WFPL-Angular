import { Component, OnInit, ViewChild } from '@angular/core';
import { FixtureCreationForm } from '../fixture-creation-form';
import { FormBuilder, FormControl } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { MatSnackBar, MatInput } from '@angular/material';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerForm } from '../../player/player-form';
import { Location, NgIfContext } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { PublicService } from '../../public.service';
import { BehaviorSubject } from 'rxjs';
import { Team } from '../../team/team';
import { Competition } from '../../competition/competition';
import { Gameweek } from '../../gameweek/gameweek';
import { GameweekForm } from '../../gameweek/gameweek-form';
import { GameweekBuilder } from '../../gameweek/gameweek.builder';

import * as Bluebird from 'bluebird';

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

  public competitionSelector: FormControl = new FormControl({value: '', disabled: true});

  public matchingCompetitionGameweek: Gameweek;


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
    public publicService: PublicService,
    public gameweekBuilder: GameweekBuilder
  ) {}

  public async ngOnInit() {
    console.log('Loaded Player New');
    this
    this.fixtureForm = new FixtureCreationForm(this.fb);
    this.gameweekForm = new GameweekForm(this.fb);
    this.fixtureTypes = await this.appService.getFixtureTypeStrings();

    this.fixtureForm.form.valueChanges.pipe(
      debounceTime(400))
      .subscribe(async (val) => {
        this.fixtureForm.form.valid ? this.competitionSelector.enable() : this.competitionSelector.disable();
      })

    this.fixtureForm.form.controls['fixtureDate'].valueChanges.pipe(
      debounceTime(400))
      .subscribe(async (value) => {
        if(this.selectedCompetition != null && value != '') {
          this.matchingCompetitionGameweek = await this.publicService.lookupCompetitionGameweeks(
            this.selectedCompetition.id,
            new Date(value));
          return;
        }
      });

    this.competitionSelector.valueChanges.pipe(
      debounceTime(400))
      .subscribe(async (value) => {
        this.selectedCompetition = null;
        if (value === '') {
          value = null;
        } else if (value instanceof Competition) {
          this.selectedCompetition = value;
          this.matchingCompetitionGameweek = await this.publicService.lookupCompetitionGameweeks(
            this.selectedCompetition.id,
            new Date(this.fixtureForm.form.controls['fixtureDate'].value
          ));
          return;
        }

        const competitions = await this.publicService.lookupCompetitions(value, 5);
        this.filteredCompetitions.next(competitions);
      });
    this.fixtureForm.form.controls['homeTeamId'].valueChanges.pipe(
      debounceTime(400))
      .subscribe(async (value) => {
        if (value === '') {
          value = null;
        }
        const teams = await this.publicService.lookupTeams(value, 5);
        this.filteredTeams.next(teams);
      });

    this.fixtureForm.form.controls['awayTeamId'].valueChanges.pipe(
      debounceTime(400))
      .subscribe(async (value) => {
        if (value === '') {
          value = null;
        }
        const teams = await this.publicService.lookupTeams(value, 5);
        this.filteredTeams.next(teams);
      });
  }

  public async onSubmit() {
    this.isLoading = true;
    try {
      let formResult = await this.fixtureForm.submit(this.snackBar);
      if(formResult !== false) {
        // map team ids
        formResult.homeTeamId = formResult.homeTeamId.id;
        formResult.awayTeamId = formResult.awayTeamId.id;
        let fixture = formResult;

        let gameweeks = this.existingSelectedGameweeks.concat(this.newSelectedGameweeks);
        await Bluebird.each(gameweeks, async (g) => {
          g.competitionId = g.competition.id;
        })
        let toSend = {
          fixture: fixture,
          gameweeks: gameweeks
        }

        let fixtureResult = await this.adminService.createFixture(toSend);
        console.log(fixtureResult);
        this.snackBar.open('Fixture successfully created', '', {
          duration: 3000
        });
        this.router.navigate(['admin']);
      }
    } catch(err) {
      this.snackBar.open(err, '', {
        duration: 3000
      })
    } finally {
      this.isLoading = false;
    }

  }

  public async addNewGameweek() {
    try {
      let formResult = await this.gameweekForm.submit(this.snackBar);
      if (formResult !== false) {
        console.log(formResult)
        let newGameweek = await this.gameweekBuilder.create(formResult);
        console.log(newGameweek)
        newGameweek.competition = this.selectedCompetition;
        this.newSelectedGameweeks.push(newGameweek);
        this.snackBar.open('Gameweek successfully added', '', {
           duration: 3000
        });
        this.gameweekForm.form.reset();
      }
    } catch(err) {

    }
  }

  public async addExistingGameweek() {
    this.matchingCompetitionGameweek.competition = this.selectedCompetition;
    this.existingSelectedGameweeks.push(this.matchingCompetitionGameweek);
    this.matchingCompetitionGameweek = null;
    this.snackBar.open('Gameweek successfully added', '', {
      duration: 3000
    });
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
