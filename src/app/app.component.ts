import { Component, OnChanges } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { NotificationsService } from 'angular2-notifications'

import _ from "lodash";

import { Player } from './player/player';
import { CardService } from './card/card.service';
import { PlayerService } from './player/player.service';
import { GameService } from './game/game.service';
import { Constants } from './constants'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private gameIsOn: boolean = (this.localStorage.getItem('gameIsOn') == 'true') || false;
  cloudName = Constants.cloudName;

  constructor(private cardService: CardService,
              private playerService: PlayerService,
              private gameService: GameService,
              private localStorage: CoolLocalStorage,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    if (!this.localStorage.getObject('cards')) {this.localStorage.setObject('cards', Constants.cards)};
    if (!this.localStorage.getObject('players')) {this.localStorage.setObject('players', Constants.players)};
  }

  startGame(): void {
    let players = this.playerService.getPlayers();
    if (players.length < 3 || players.length > 8) {
    this.notificationsService.error(
      'Количество игроков должно быть от 3 до 8!'
    )
    } else {
      this.localStorage.setItem('gameIsOn', 'true');
      this.gameIsOn = !this.gameIsOn;
      let cards = this.cardService.getCards();
      this.gameService.passCards(players, cards);
    }
  }

  public options = {
    timeOut: 5000,
    showProgressBar: true
  }
}
