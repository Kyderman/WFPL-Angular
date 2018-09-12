import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    TeamDetailComponent
  ],
  providers: [
  ]
})
export class TeamModule { }
