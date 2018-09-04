import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
