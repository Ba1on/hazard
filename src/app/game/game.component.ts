import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import _ from "lodash";

import { Card } from '../card/card';
import { Player } from '../player/player';
import { CardService } from '../card/card.service';
import { PlayerService } from '../player/player.service';
import { GameService } from './game.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {
  cards: {};
  players: {};
  mainPanel: Card;
  judge: Player;
  current_player: Player;

  constructor(private cardService: CardService,
              private playerService: PlayerService,
              private gameService: GameService
              ) { }

  setCurrent(players): void {
    this.judge = _.sample(players);
    this.current_player = this.judge;
  }

  getPlayers(): void {
    this.players = this.playerService.getPlayers();
    this.setCurrent(this.players);
  }

  createMainPanel(cards): void {
    cards = _.filter(cards, {status: 'in-the-desk'})
    this.mainPanel = _.sample(cards);
    this.mainPanel.status = 'in-game';
    this.cardService.update(this.mainPanel)
  }

  getCards(): void {
    this.cards = this.cardService.getCards()
    this.getPlayers();
    this.createMainPanel(this.cards);
  }


  ngOnInit(): void {
    this.getCards();
  }

  chooseCard(player: Player): void {
    if (this.current_player == this.judge) {
      console.log('judge')
      console.log(this.current_player)
      if (true){}
    }else {
      this.current_player = this.gameService.next(this.players, this.current_player)
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
