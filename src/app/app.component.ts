import { Component, OnChanges } from '@angular/core';

import { Player } from './player/player';
import { PlayerService } from './player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private gameIsOn: boolean = false;

  constructor(private playerService: PlayerService) { }

  startGame(): void {
    this.playerService.getPlayers().then(players => {
      if (players.length < 3 || players.length > 8) {
        alert('The number of players must be more than three and less than eight!')
      } else {
        this.gameIsOn = !this.gameIsOn;
      }
    });
  }
}
