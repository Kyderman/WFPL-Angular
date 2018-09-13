import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PlayerRoutingModule
  ],
  declarations: [
    PlayerDetailComponent
  ],
  providers: [
  ]
})
export class PlayerModule { }
