import { Injectable }    from '@angular/core';
import { CardService } from '../card/card.service';

import _ from "lodash";

@Injectable()
export class GameService {
  constructor(private cardService: CardService){}

  passCards(players, cards): void {
    players.forEach((player) => {
      cards = _.filter(cards, {status: 'in-the-desk'})
      player.cards = player.cards.concat(_.sampleSize(cards, 3-player.cards.length))
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
}