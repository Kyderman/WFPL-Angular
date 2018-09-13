import { Component, OnInit } from '@angular/core';
import { Competition } from '../../competition/competition';
import { PublicService } from '../../public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public competitions: Competition[] = [];

  constructor(
    public publicService: PublicService,
    public router: Router
  ) { }

  public async ngOnInit() {
    this.competitions = await this.publicService.getAllCompetitions();
  }

  public async createCompetition() {
    this.router.navigateByUrl('admin/competitions/new');
  }

  public async addFixtures() {
    this.router.navigateByUrl('admin/fixtures/new');
  }

}
