import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PublicService } from '../../public.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  public player: Player = new Player({});

  constructor(
    public publicService: PublicService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  public async ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.player = await this.publicService.getPlayer(p.id);
    })
  }



}
