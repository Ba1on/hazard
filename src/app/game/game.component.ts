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
  leftPanel: Card;
  rightPanel: Card;
  judge: Player;
  current_player: Player;

  constructor(private cardService: CardService,
              private playerService: PlayerService,
              private gameService: GameService,
              private dragulaService: DragulaService
              ) { dragulaService.drag.subscribe((value) => {
                    this.onDrag(value.slice(1));
                  });
                  dragulaService.drop.subscribe((value) => {
                    this.onDrop(value);
                  });
                }


  private onDrag(args) {
    let [e, el] = args;
    // do something
  }
  
  private onDrop(args) {
    let [e, el, container] = args;
    let droppableCard = this.cardService.getCard(el.dataset.id);
    if (container.id == 'left-panel'){
      this.leftPanel = droppableCard;
      this.leftPanel.status = 'in-game';
      this.cardService.update(this.leftPanel)

    }else if (container.id == 'right-panel'){
      this.rightPanel = droppableCard;
      this.rightPanel.status = 'in-game';
      this.cardService.update(this.rightPanel)

    }else{
      return false
    }

    // do something
  }

  setCurrent(players): void {
    this.judge = _.sample(players);
    this.current_player = this.judge;
  }

  letPlay = () => {
    let gamePanel = [this.leftPanel, this.mainPanel, this.rightPanel]
    if (this.current_player == this.judge && gamePanel.filter(Boolean).length > 1){
      return true
    }else {
      return false
    }
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

  startGame = () => {
    console.log(this.current_player)
    this.current_player = this.gameService.next(this.players, this.current_player);
    console.log(this.current_player)
  }
}
