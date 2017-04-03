import { Component, Input } from '@angular/core';

import { Player } from './player'
import { PlayerService } from './player.service';


@Component({
  selector: 'players',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  getPlayers(): void {
    this.playerService
        .getPlayers()
        .then(players => this.players = players);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.playerService.create(name)
      .then(player => {
        this.players.push(player);
      }
    );
  }

  delete(player: Player): void {
    this.playerService
      .delete(player.id)
      .then(() => {
        this.players = this.players.filter(h => h !== player);
      }
    );
  }

  ngOnInit(): void {
    this.getPlayers();
  }

}
