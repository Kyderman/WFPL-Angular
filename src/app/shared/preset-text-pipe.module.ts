import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresetTextFullnamePipe } from './pipes/preset-text-fullname.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ PresetTextFullnamePipe],
  exports: [PresetTextFullnamePipe]
})
export class PresetTextPipeModule { }
