import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from './player'
import { PlayerService } from './player.service';
import { PlayService } from '../play.service'


@Component({
  selector: 'players',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  players: Player[] = [];

  constructor(private playerService: PlayerService,
              private playService: PlayService,
              private router: Router
              ) { }

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

  startGame(): void {
    if (this.players.length < 3 || this.players.length > 8) {
      alert('The number of players must be more than three and less than eight!')
    } else {
      // play
      this.router.navigate(['/game']);
    }
  }

}
