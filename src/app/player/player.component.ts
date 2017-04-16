import { Component, Input } from '@angular/core';
import _ from "lodash";

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
    let players = this.playerService.getPlayers();
    if (Array.isArray(players)){
      this.players = players;
    }
    
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.playerService.create(name);
    this.getPlayers()
  }

  delete(player: Player): void {
    this.playerService.delete(player.id)
    this.players = _.pull(this.players, '').filter(h => h !== player);
  }

  ngOnInit(): void {
    this.getPlayers();
  }
}
