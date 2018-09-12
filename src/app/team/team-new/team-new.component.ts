import { Component, OnInit } from '@angular/core';
import { TeamForm } from '../team-form';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'team-new',
  templateUrl: './team-new.component.html',
  styleUrls: ['./team-new.component.scss']
})
export class TeamNewComponent implements OnInit {

  public isReady: boolean = false;
  public isLoading: boolean = false;
  public teamForm: TeamForm;
  public fixtureTypes: String[] = [];
  private competitionId: number = null;


  constructor (
    public fb: FormBuilder,
    public adminService: AdminService,
    public snackBar: MatSnackBar,
    public appService: AppService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  public async ngOnInit() {
    console.log('Loaded Team New');
    this.teamForm = new TeamForm(this.fb);
    this.route.params.subscribe(async (p) => {
      this.competitionId = p.id;
    })
    this.fixtureTypes = await this.appService.getFixtureTypeStrings();
  }

  public async onSubmit() {
    this.isLoading = true;
    try {
      let formResult = await this.teamForm.submit(this.snackBar);
      if(formResult !== false) {
        let team = await this.adminService.createTeam(this.competitionId, formResult);
        this.snackBar.open('Team successfully created', '', {
          duration: 3000
        })
        // relocate to the competition dashboard
        this.router.navigate(['clubs', team.id]);
      }
    } catch(err) {
      this.snackBar.open(err, '', {
        duration: 3000
      })
    } finally {
      this.isLoading = false;
    }

  }

}
