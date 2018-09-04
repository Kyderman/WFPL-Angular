import { AuthorizationGuard } from './guards/authorization-guard';
import { AuthGuard } from './guards/auth.guard';
import { AntiAuthGuard } from './guards/anti-auth.guard';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    canActivate: [AntiAuthGuard]
  },
];
