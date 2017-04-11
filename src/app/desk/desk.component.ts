import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import _ from "lodash";

import { Desk } from './desk';
import { Card } from '../card/card';
import { Player } from '../player/player';
import { DeskService } from './desk.service';
import { CardService } from '../card/card.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'game',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.sass']
})
export class DeskComponent {
  cards: Card[] = [];
  desks: Desk[] = [];
  special: Desk;
  players: Player[] = [];
  judge: Player;
  current_player: Player;

  constructor(private deskService: DeskService,
              private cardService: CardService,
              private playerService: PlayerService,
              ) { }

  updateDesk(userId: number): void {
    if (!userId) { return; }
    // this.deskService.update()
  }

  createDesks(players): void {
    players.forEach((player) => {
      this.deskService.create(player.id, Array(3))
    })
  }

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

  setCurrent(players): void {
    this.judge = _.sample(players);
    this.current_player = this.judge;
  }

  getPlayers(): void {
    this.playerService
        .getPlayers()
        .then(players => { 
          this.players = players;
          this.setCurrent(this.players);
          this.createDesks(this.players);
          this.passCards(this.players, this.cards);
          this.getDesks();
        })
  }

  getCards(): void {
    this.cardService
        .getCards()
        .then(cards => {
          this.cards = cards;
          this.getPlayers()
        })
  }

  getDesks(): void {
    this.deskService
        .getDesks()
        .then(desks => { 
          this.desks = desks;
        })
  }

  findDesk(desks, userId): void {
    return _.find(desks, {userId: userId})
  }

  ngOnInit(): void {
    this.getCards();
  }

  next(myArray, item): void {
    if (_.last(myArray) == item){ 
      return _.first(myArray)
    }else {
      return _.find(myArray, {id: item.id + 1})
    }
  }

  chooseCard(player: Player): void {
    if (this.current_player == this.judge) {
      console.log('judge')
      console.log(this.current_player)
      if (true){}
    }else {
      this.next(this.players, this.current_player)
      console.log('usual')
      console.log(this.current_player)
    }
  }
}





// class RepeatExample {
//   public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
//   public many2: Array<string> = ['Explore', 'them'];

//   constructor(private dragulaService: DragulaService) {
//     dragulaService.dropModel.subscribe((value) => {
//       this.onDropModel(value.slice(1));
//     });
//     dragulaService.removeModel.subscribe((value) => {
//       this.onRemoveModel(value.slice(1));
//     });
//   }

//   private onDropModel(args) {
//     let [el, target, source] = args;
//     // do something else
//   }

//   private onRemoveModel(args) {
//     let [el, source] = args;
//     // do something else
//   }
// }
