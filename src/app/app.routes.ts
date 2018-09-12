import { AuthorizationGuard } from './guards/authorization-guard';
import { AuthGuard } from './guards/auth.guard';
import { AntiAuthGuard } from './guards/anti-auth.guard';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [AntiAuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthorizationGuard],
    data: {roles: ['Admin']}
  },
  {
    path: 'competitions',
    loadChildren: './competition/competition.module#CompetitionModule',
  },
  {
    path: 'clubs',
    loadChildren: './team/team.module#TeamModule',
  }
];
