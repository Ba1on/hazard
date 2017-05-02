import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Constants } from '../constants'
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
  droppedCard: Card;
  judge: Player;
  current_player: Player;
  cool_player: Player;
  gamePanel = [];
  pointCards: Card[];

  constructor(private cardService: CardService,
              private playerService: PlayerService,
              private gameService: GameService,
              private dragulaService: DragulaService
              ) { dragulaService.drop.subscribe((value) => {
                    this.onDrop(value);
                  });

                  dragulaService.setOptions('bag-one', {
                    revertOnSpill: true,
                     accepts: (el, target, source, sibling) => {
                      return this.onAccept(el, target)
                    },
                    moves: (el, container, handle) => {
                      return this.noMove(el)
                    }
                  });
                }

  private onAccept(el, target) {
    let judgeCondition = true;
    if (this.current_player == this.judge) {
      judgeCondition = this.gamePanel.filter(Boolean).length > 1
    }
    console.log(judgeCondition)
    return !(this[target.id] && (this[target.id].userId == this.current_player.id || this[target.id].status == 'in-game'))
  }

  private noMove(el) {
    let droppableCard = this.cardService.getCard(this.cards, el.dataset.id);
    return !(droppableCard == this.mainPanel && !droppableCard.userId);
  }

  private onDrop(args) {
    let [e, el, container, sourse] = args;
    if (container.id){
      this.droppedCard = this.cardService.getCard(this.cards, el.dataset.id);
      this[container.id] = this.droppedCard
    }
    this[sourse.id] = null
  }

  setCurrent(players): void {
    this.judge = _.sample(players);
    this.current_player = this.judge;
  }

  letPlay = () => {
    this.gamePanel = [this.leftPanel, this.mainPanel, this.rightPanel];
    if (this.current_player == this.judge){
      return this.gamePanel.filter(Boolean).length == 2
    }
    else{
      return this.gamePanel.filter(Boolean).length == 3
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
    if (!this.mainPanel) this.createMainPanel(this.cards);
  }

  ngOnInit(): void {
    this.getCards();
    this.pointCards = _.filter(this.cards, (card) => { return card.status == 'review'})
  }

  setPoint(card): void {
    let player = this.playerService.getPlayer(this.players, card.userId);
    player.points += 1;
    this.playerService.update(player);
    this.nextRound()
  }

  nextRound = () => {
    this.cool_player = _.find(this.players, (player) => { return player.points == Constants.maxPoints});
    if (this.cool_player) {
      return;
    }else{
      this.judge = this.gameService.next(this.players, this.judge);
      this.current_player = this.gameService.next(this.players, this.current_player);
      let cardOutage = _.filter(this.cards, (card) => { return card.status == 'review' || card.status == 'in-game'});
      cardOutage.forEach((card) => {
        card.status = 'card-outage';
        this.cardService.update(card);
      })
      this.gameService.passCards(this.players, this.cards);
      this.leftPanel = this.mainPanel = this.rightPanel = null;
      this.pointCards = [];
      this.createMainPanel(this.cards)
    }
  }

  nexPlayer = () => {
    let panelName = this.gameService.panelName(this.droppedCard, this.leftPanel, this.rightPanel)
    if (this.current_player == this.judge){
      this[panelName].status = 'in-game'
    }else {
      this[panelName].status = 'review'
    }
    this.cardService.update(this[panelName])
    this.current_player.cards = this.current_player.cards.filter((card) => {return card.id !== this.droppedCard.id})
    this.playerService.update(this.current_player)

    let cardsCount = this.current_player.cards.length;
    this.current_player = this.gameService.next(this.players, this.current_player);
    if (this.current_player == this.judge && cardsCount < Constants.cardsOnHands){
      this.pointCards = _.filter(this.cards, (card) => { return card.status == 'review'})
    }
  }


}
