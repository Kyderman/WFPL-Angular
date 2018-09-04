import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeStringPipe } from './../shared/pipes/time-string.pipe';

@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [
    TimeStringPipe
  ],
  exports: [
    TimeStringPipe
  ]
})
export class TimePipeModule { }
