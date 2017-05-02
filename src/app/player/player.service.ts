import { Injectable }    from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import _ from "lodash";

import { Player } from './player';

@Injectable()
export class PlayerService {

  constructor(private localStorage: CoolLocalStorage) { }

  getPlayers = () => {
    let players = this.localStorage.tryGetObject('players')
    if (Array.isArray(players)) return players
  }

  getPlayer = (players, id: number) => {
    return _.find(players, function(player) { return player.id == id; });
  }

  delete = (id: number) => {
    let players = this.getPlayers()
    players = players.filter((player) => { return player.id !== id; })
    this.localStorage.setObject('players', players)
  }

  create = (userName: string) => {
    let players = this.getPlayers()
    let player = new Player({id: this.nextId(players), name: userName, isJudge: false, points: 0, cards: []});
    players.push(player)
    this.localStorage.setObject('players', players)
  }

  nextId = (players) => {
    if (players.length == 0){
      return 1
    }else{
      return _.last(players).id + 1
    }
  }

  update = (player: Player) => {
    let players = this.getPlayers()
    let updatePlayer = this.getPlayer(players, player.id)
    players = players.filter((updatedPlayer) => { return player.id !== updatedPlayer.id })
    players.push(player);
    this.localStorage.setObject('players', players)
  }

  getPlayerToLs = (players, playerRole) => {
    let playerId = this.localStorage.getItem(playerRole);
    return this.getPlayer(players, Number.parseInt(playerId))
  }
}
