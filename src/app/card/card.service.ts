import { Injectable }    from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import _ from "lodash";

import { Card } from './card';

@Injectable()
export class CardService {

  constructor(private localStorage: CoolLocalStorage) { }

  getCards = () => {
    let cards = this.localStorage.tryGetObject('cards')
    if (Array.isArray(cards)) return cards
  }

  getCard = (cards, id: string) => {
    return _.find(cards, function(card) { return card.id == id; });
  }

  update = (updateCard: Card) => {
    let cards = this.getCards();
    cards = cards.filter((card) => { return card.id !== updateCard.id })
    cards.push(updateCard);
    this.localStorage.setObject('cards', cards)
  }

  filterCards = (cards, status) => {
    return cards.filter(card => card.status == status)
  }

  getPanelToLs = (cards, panelName) => {
    let cardId = this.localStorage.getItem(panelName);
    return this.getCard(cards, cardId)
  }
}
