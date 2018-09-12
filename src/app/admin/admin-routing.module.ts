import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CompetitionNewComponent } from '../competition/competition-new/competition-new.component';
import { TeamNewComponent } from '../team/team-new/team-new.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'competitions/new',
    component: CompetitionNewComponent
  },
  {
    path: 'competitions/:id/clubs/new',
    component: TeamNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
