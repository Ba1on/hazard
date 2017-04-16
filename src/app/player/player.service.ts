import { Injectable }    from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import _ from "lodash";

import { Player } from './player';

@Injectable()
export class PlayerService {

  constructor(private localStorage: CoolLocalStorage) { }

  getPlayers = () => {
    return this.localStorage.tryGetObject('players')
  }

  getPlayer = (id: number) => {
    let players = this.getPlayers();
    if (Array.isArray(players)) return _.find(players, function(player) { return player.id == id; });
  }

  delete = (id: number) => {
    let players = this.getPlayers()
    if (Array.isArray(players)){
      players = players.filter((player) => { return player.id !== id; })
      this.localStorage.setObject('players', players)
    }
  }

  create = (userName: string) => {
    let players = this.getPlayers()
    let player = new Player({id: this.nextId(players), name: userName, isJudge: false, points: 0, cards: []});
    if (Array.isArray(players)){
      players.push(player)
    }
    this.localStorage.setObject('players', players)
  }

  nextId = (players) => {
    if (players.lendth > 0){
      return _.last(players).id + 1
    }else{
      return 1
    }
  }

  update = (player: Player) => {
    let players = this.getPlayers()
    let updatePlayer = this.getPlayer(player.id)
    players = _.pull(players, updatePlayer)
    if (Array.isArray(players)) players.push(player);
    this.localStorage.setObject('players', players)
  }
}