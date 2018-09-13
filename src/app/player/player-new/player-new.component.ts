import { Component, OnInit } from '@angular/core';
import { PlayerForm } from '../player-form';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.scss']
})
export class PlayerNewComponent implements OnInit {

  public isReady: boolean = false;
  public isLoading: boolean = false;
  public playerForm: PlayerForm;
  private teamId: number = null;

  constructor (
    public fb: FormBuilder,
    public adminService: AdminService,
    public snackBar: MatSnackBar,
    public appService: AppService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location
  ) {}

  public async ngOnInit() {
    console.log('Loaded Player New');
    this.playerForm = new PlayerForm(this.fb);
    this.route.params.subscribe(async (p) => {
      this.teamId = p.id;
    })
  }

  public async onSubmit() {
    this.isLoading = true;
    try {
      let formResult = await this.playerForm.submit(this.snackBar);
      if(formResult !== false) {
        let team = await this.adminService.createTeamPlayers(this.teamId, [formResult]);
        this.snackBar.open('Player successfully created', '', {
          duration: 3000
        })
        // relocate to the team dashboard
        this.router.navigate(['clubs', this.teamId]);
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

}
