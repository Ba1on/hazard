import { Card } from '../card/card'

export class Player {
  id: number;
  name: string;
  isJudge: boolean;
  points: number;
  cards: Array<Card>;
}