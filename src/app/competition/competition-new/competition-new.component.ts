import { Component, OnInit } from '@angular/core';
import { CompetitionForm } from '../competition-form';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'competition-new',
  templateUrl: './competition-new.component.html',
  styleUrls: ['./competition-new.component.scss']
})
export class CompetitionNewComponent implements OnInit {

  public isReady: boolean = false;
  public isLoading: boolean = false;
  public competitionForm: CompetitionForm;

  constructor (
    public fb: FormBuilder,
    public adminService: AdminService,
    public snackBar: MatSnackBar,
  ) {}

  public async ngOnInit() {
    console.log('Loaded Competition New');
    this.competitionForm = new CompetitionForm(this.fb);
  }

  public async onSubmit() {
    this.isLoading = true;
    try {
      let formResult = await this.competitionForm.submit(this.snackBar);
      if(formResult !== false) {
        await this.adminService.createCompetition(formResult);
        this.snackBar.open('Competition successfully created', '', {
          duration: 3000
        })
        // relocate to the competition dashboard
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
