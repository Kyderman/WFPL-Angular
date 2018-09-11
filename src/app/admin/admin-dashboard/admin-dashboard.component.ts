import { Component, OnInit } from '@angular/core';
import { Competition } from '../../competition/competition';
import { PublicService } from '../../public.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public competitions: Competition[] = [];

  constructor(
    public publicService: PublicService
  ) { }

  public async ngOnInit() {
    this.competitions = await this.publicService.getAllCompetitions();
  }

}
