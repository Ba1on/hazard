import { Injectable }    from '@angular/core';
import { CardService } from '../card/card.service';
import { PlayerService } from '../player/player.service';
import { Constants } from '../constants'

import _ from "lodash";

@Injectable()
export class GameService {
  constructor(private cardService: CardService,
              private playerService: PlayerService){}

  passCards(players, cards): void {
    players.forEach((player) => {
      cards = _.filter(cards, {status: 'in-the-desk'})
      player.cards = player.cards.concat(_.sampleSize(cards, Constants.cardsOnHands-player.cards.length))
      this.playerService.update(player);
      player.cards.forEach((card) => {
        card.status = 'on-hands';
        card.userId = player.id;
        this.cardService.update(card)
      })
    })
  }

  next = (myArray, item) => {
    if (_.last(myArray) == item){
      return _.first(myArray)
    }else {
      return _.find(myArray, {id: item.id + 1})
    }
  }

  panelName = (panel, leftPanel, rightPanel) => {
    if (panel == leftPanel) return 'leftPanel';
    if (panel == rightPanel) return 'rightPanel';
  }
}
