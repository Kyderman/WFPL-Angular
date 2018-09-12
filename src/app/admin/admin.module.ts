import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCompetitionListComponent } from './admin-dashboard/admin-competition-list/admin-competition-list.component';
import { AdminService } from './admin.service';
import { CompetitionNewComponent } from '../competition/competition-new/competition-new.component';
import { TeamNewComponent } from '../team/team-new/team-new.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminDashboardComponent,
    AdminCompetitionListComponent,
    CompetitionNewComponent,
    TeamNewComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
