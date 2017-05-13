import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NotificationsService } from 'angular2-notifications';
import { Constants } from '../constants';
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
  cards: Card[];
  players: Player[];
  mainPanel: Card;
  leftPanel: Card;
  rightPanel: Card;
  droppedCard: Card;
  coolCard: Card;
  judge: Player;
  current_player: Player;
  cool_player: Player;
  gamePanel = [];
  pointCards: Card[];
  cloudName = Constants.cloudName;

  constructor(private cardService: CardService,
              private playerService: PlayerService,
              private gameService: GameService,
              private dragulaService: DragulaService,
              private notificationsService: NotificationsService
              ) { dragulaService.drop.subscribe((value) => {
                    this.onDrop(value);
                  });

                  dragulaService.drag.subscribe((value) => {
                    this.onDrag(value)
                  });


                  dragulaService.setOptions('bag-one', {
                    revertOnSpill: true,
                    accepts: (el, target, source, sibling) => {
                      // if (!this.onAccept(el, target)) notificationsService.error('Алярма!','Донт ду ит!!11')
                      return this.onAccept(el, target)
                    },
                    moves: (el, container, handle) => {
                      // if (!this.noMove(el)) notificationsService.error('Алярма!','Донт тач ит!!11')
                      return this.noMove(el)
                    }
                  });
                }

  private onDrag(args) {
    let [e, el] = args;
    el.classList.remove('resize')
  }

  private onAccept(el, target) {
    return !(this[target.id] && (this[target.id].userId == this.current_player.id || this[target.id].status == 'in-game') || ((this.current_player == this.judge) && this.current_player.cards.length < Constants.cardsOnHands))
  }

  private noMove(el) {
    let droppableCard = this.cardService.getCard(this.cards, el.dataset.id);
    if (droppableCard) return !(droppableCard == this.mainPanel && !droppableCard.userId || droppableCard.userId !== this.current_player.id);
  }

  private onDrop(args) {
    let [e, el, container, sourse] = args;
    if (container.id){
      this.droppedCard = this.cardService.getCard(this.cards, el.dataset.id);
      this[container.id] = this.droppedCard
      this.gameService.setSomethToLs(this.droppedCard.id, container.id);
      this.gameService.setSomethToLs(this.droppedCard.id, 'droppedCard');
    }
    this[sourse.id] = null
    this.gameService.setSomethToLs(this[sourse.id], sourse.id)

    let panel = [this.leftPanel, this.mainPanel, this.rightPanel]
    if (this.current_player == this.judge && panel.filter(Boolean).length == 3) {
      this.notificationsService.info(
        'Вы можете добавить только одну карту. Пожалуйста, уберите лишнюю'
      )
    }

  }

  letPlay = () => {
    this.gamePanel = [this.leftPanel, this.mainPanel, this.rightPanel];
    if (this.current_player == this.judge){
      return this.gamePanel.filter(Boolean).length == 2
    }
    else{
      return this.gamePanel.filter(Boolean).length == 3 && _.map(this.gamePanel, 'userId').indexOf(this.current_player.id) !== -1
    }
  }

  getPlayers(): void {
    this.players = this.playerService.getPlayers();
    this.judge = this.playerService.getPlayerToLs(this.players, 'judge');
    if (!this.judge){
      this.judge = _.sample(this.players);
      this.gameService.setSomethToLs(this.judge.id, 'judge');
    }
    this.current_player = this.playerService.getPlayerToLs(this.players, 'current_player');
    if (!this.current_player){
      this.current_player = this.judge;
      this.gameService.setSomethToLs(this.current_player.id, 'current_player');
    }
  }

  createMainPanel(cards): void {
    Constants.panels.forEach( panel => this[panel] = this.cardService.getPanelToLs(cards, panel))
    if (!this.mainPanel) {
      cards = this.cardService.filterCards(cards, 'in-the-desk')
      this.mainPanel = _.sample(cards);
      this.mainPanel.status = 'in-game';
      this.cardService.update(this.mainPanel)
      this.gameService.setSomethToLs(this.mainPanel.id, 'mainPanel')
    }
  }

  getCards(): void {
    this.cards = this.cardService.getCards()
    if (!this.mainPanel) this.createMainPanel(this.cards);
  }

  ngOnInit(): void {
    this.getCards();
    this.getPlayers();
    this.pointCards = this.cardService.filterCards(this.cards, 'review')
  }

  setPoint(card): void {
    let player = this.playerService.getPlayer(this.players, card.userId);
    player.points += 1;
    this.playerService.update(player);
    this.nextRound()
  }

  nextRound = () => {
    this.gameService.returnCardToPlayer(this.players, this.coolCard)
    this.cool_player = _.find(this.players, (player) => { return player.points == Constants.maxPoints});
    this.judge = this.gameService.next(this.players, this.judge, 'judge');
    this.current_player = this.gameService.next(this.players, this.current_player, 'current_player');
    let cardOutage = _.filter(this.cards, (card) => { return card.status == 'review' || card.status == 'in-game'});
    cardOutage.forEach((card) => {
      card.status = 'card-outage';
      this.cardService.update(card);
    })
    this.gameService.passCards(this.players, this.cards);
    this.leftPanel = this.mainPanel = this.rightPanel = this.coolCard = null;
    Constants.panels.forEach( panel => this[panel] = this.gameService.setSomethToLs(null, panel))
    this.pointCards = [];
    this.createMainPanel(this.cards);
  }

  nexPlayer = () => {
    let droppedCard = this.droppedCard || this.cardService.getPanelToLs(this.cards, 'droppedCard')
    let panelName = this.gameService.panelName(droppedCard, this.leftPanel, this.rightPanel)
    if (this.current_player == this.judge){
      droppedCard = [this.leftPanel, this.rightPanel].filter(Boolean)[0];
      panelName = this.gameService.panelName(droppedCard, this.leftPanel, this.rightPanel);
      this[panelName].status = 'in-game';
    }else {
      this[panelName].status = 'review';
    }
    this.cardService.update(this[panelName]);
    this.current_player.cards = this.current_player.cards.filter((card) => {return card.id !== droppedCard.id})
    this.playerService.update(this.current_player)
    let cardsCount = this.current_player.cards.length;
    this.current_player = this.gameService.next(this.players, this.current_player, 'current_player');
    if (this.current_player == this.judge && cardsCount < Constants.cardsOnHands){
      this.pointCards = this.cardService.filterCards(this.cards, 'review');
    }
  }

  resize = (event) => {
    event.target.parentElement.classList.toggle('resize')
  }
}
