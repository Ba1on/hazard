import { Injectable }    from '@angular/core';
import { CardService } from '../card/card.service';
import { PlayerService } from '../player/player.service';
import { Constants } from '../constants';
import { CoolLocalStorage } from 'angular2-cool-storage';

import _ from "lodash";

@Injectable()
export class GameService {
  constructor(private cardService: CardService,
              private playerService: PlayerService,
              private localStorage: CoolLocalStorage){}

  passCards(players, cards): void {
    players.forEach((player) => {
      cards = this.cardService.filterCards(cards, 'in-the-desk')
      player.cards = player.cards.concat(_.sampleSize(cards, Constants.cardsOnHands-player.cards.length))
      this.playerService.update(player);
      player.cards.forEach((card) => {
        card.status = 'on-hands';
        card.userId = player.id;
        this.cardService.update(card)
      })
    })
  }

  next = (myArray, item, itemName) => {
    let player;
    if (_.last(myArray) == item){
      player = _.first(myArray)
    }else {
      player = _.find(myArray, {id: item.id + 1})
    }
    this.setSomethToLs(player.id, itemName);
    return player;
  }

  panelName = (panel, leftPanel, rightPanel) => {
    if (panel == leftPanel) return 'leftPanel';
    if (panel == rightPanel) return 'rightPanel';
  }

  setSomethToLs = (id, fieldName) => {
    this.localStorage.setItem(fieldName, id)
  }
}
