import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
              private router: Router
              ) { }

  createDesk(userId: number): void {
    if (!userId) { return; }
    this.deskService.create(userId)
  }

  passCards(players, cards): void {
    players.forEach((player) => {
      cards = _.filter(cards, {status: 'in-the-desk'})
      player.cards = _.sampleSize(cards, 4)
      player.cards.forEach((card) => {
        card.status = 'on-hands';
        this.cardService.update(card)
      })
    })
  }

  setCurrent(players): void {
    this.judge = _.sample(players);
    this.current_player = this.judge;
    this.createDesk(this.judge.id);
    this.getDesks();
  }

  getPlayers(): void {
    this.playerService
        .getPlayers()
        .then(players => { 
          this.players = players;
          this.setCurrent(players);
        })
  }

  getCards(): void {
    this.cardService
        .getCards()
        .then(cards => {
          this.cards = cards;
          this.passCards(this.players, this.cards)
        })
  }

  getDesks(): void {
    this.deskService
        .getDesks()
        .then(desks => { 
          this.desks = desks;
        })
  }

  print(cards): void{
    console.log(cards)
  }

  ngOnInit(): void {
    this.getPlayers();
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
      this.createDesk(this.current_player.id);
      this.next(this.players, this.current_player)
      console.log('usual')
      console.log(this.current_player)
    }
  }
}