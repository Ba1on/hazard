import { Card } from '../card/card'

export class Player {
  id:      number;
  name:    string;
  isJudge: boolean;
  points:  number;
  cards:   Array<Card>;

  constructor(player:Player){
    this.id      = player.id
    this.name    = player.name
    this.isJudge = player.isJudge
    this.points  = player.points
    this.cards   = player.cards
  }
}
