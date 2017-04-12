import { Component, OnChanges } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';

import { Player } from './player/player';
import { PlayerService } from './player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private gameIsOn: boolean = (this.localStorage.getItem('gameIsOn') == 'true') || false;

  constructor(private playerService: PlayerService,
              private localStorage: CoolLocalStorage) { }

  startGame(): void {
    this.playerService.getPlayers().then(players => {
      if (players.length < 3 || players.length > 8) {
        alert('The number of players must be more than three and less than eight!')
      } else {
        this.localStorage.setItem('gameIsOn', 'true');
        this.gameIsOn = !this.gameIsOn;
      }
    });
  }
}
