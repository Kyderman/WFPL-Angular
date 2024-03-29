import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './user/user.service';
import { RefreshDialogComponent } from './authentication/refresh-dialog';
import { MaterialModule } from './material.module';

import { ROUTES } from './app.routes';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog';
import { HomeComponent } from './home';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SideNavComponent } from './navigation/side-nav';
import { TopNavComponent } from './navigation/top-nav';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { AntiAuthGuard } from './guards/anti-auth.guard';
import { AuthorizationGuard } from './guards/authorization-guard';
import { AppService } from './app.service';
import { UserBuilder } from './user/user.builder';
import { PublicService } from './public.service';
import { CompetitionBuilder } from './competition/competition.builder';
import { TeamBuilder } from './team/team.builder';
import { PlayerBuilder } from './player/player.builder';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { GameweekBuilder } from './gameweek/gameweek.builder';
import { FixtureBuilder } from './fixture/fixture.builder';

export function getJwtToken(): string {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RefreshDialogComponent,
    HomeComponent,
    ConfirmDialogComponent,
    SideNavComponent,
    TopNavComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    MaterialModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getJwtToken,
        whitelistedDomains: [
          'localhost:4200',
          'localhost:8000',
          'localhost:3001',
        ]
      }
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService,
    AuthenticationService,
    AuthGuard,
    AntiAuthGuard,
    AuthorizationGuard,
    AppService,
    UserBuilder,
    PublicService,
    CompetitionBuilder,
    TeamBuilder,
    PlayerBuilder,
    GameweekBuilder,
    FixtureBuilder,
    MomentDateAdapter, MatMomentDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter }
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    RefreshDialogComponent,
    ConfirmDialogComponent,
  ]
})
export class AppModule { }
