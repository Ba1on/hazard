import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import _ from "lodash";

import { Card } from '../card/card';
import { Player } from '../player/player';
import { CardService } from '../card/card.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {
  cards: Card[] = [];
  players: Player[] = [];
  mainPanel: Card;
  judge: Player;
  current_player: Player;

  constructor(private cardService: CardService,
              private playerService: PlayerService,
              ) { }

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
          this.passCards(this.players, this.cards);

        })
  }

  createMainPanel(cards): void {
    cards = _.filter(cards, {status: 'in-the-desk'})
    this.mainPanel = _.sample(cards);
    this.mainPanel.status = 'in-game';
    this.cardService.update(this.mainPanel).then((res) => console.log(this.mainPanel.id))
  }

  getCards(): void {
    this.cardService
        .getCards()
        .then(cards => {
          this.cards = cards;
          this.getPlayers();
                              this.createMainPanel(this.cards);

        })
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
