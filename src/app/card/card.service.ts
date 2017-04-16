import { Injectable }    from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import _ from "lodash";

import { Card } from './card';

@Injectable()
export class CardService {

  constructor(private localStorage: CoolLocalStorage) { }

  getCards = () => {
    return this.localStorage.tryGetObject('cards')
  }

  getCard = (id: number) => {
    let cards = this.getCards();
    _.find(cards, function(card) { return card.id == id; });
  }

  update = (updateCard: Card) => {
    let cards = this.getCards();
    if (Array.isArray(cards)) cards = cards.filter((card) => { return card.id !== updateCard.id })
    if (Array.isArray(cards)) cards.push(updateCard);
    this.localStorage.setObject('cards', cards)
  }
}