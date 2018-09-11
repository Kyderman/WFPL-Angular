import { Component, OnInit, Input } from '@angular/core';
import { Competition } from '../../../competition/competition';

@Component({
  selector: 'admin-competition-list',
  templateUrl: './admin-competition-list.component.html',
  styleUrls: ['./admin-competition-list.component.scss']
})
export class AdminCompetitionListComponent implements OnInit {

  @Input() competitions: Competition[] = [];

  constructor() { }

  public async ngOnInit() {
  }

  public async selectCompetition(c: Competition) {

  }

}
