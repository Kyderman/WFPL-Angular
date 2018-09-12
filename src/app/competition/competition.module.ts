import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompetitionDetailComponent
  ],
  providers: [
  ]
})
export class CompetitionModule { }
