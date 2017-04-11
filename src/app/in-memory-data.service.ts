import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let players = [
      {id: 1, name: 'Player 1', isJudge: false, points: 0, cards: []},
      {id: 2, name: 'Player 2', isJudge: false, points: 0, cards: []},
      {id: 3, name: 'Player 3', isJudge: false, points: 0, cards: []}
    ];

    let cards = [
      {id: 1, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 2, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 3, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 4, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 5, url: 'http://', status: 'in-the-desk', type: 'red', position: 0},
      {id: 6, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 7, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 8, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 9, url: 'http://', status: 'in-the-desk', type: 'red', position: 0},
      {id: 10, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 11, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 12, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0},
      {id: 13, url: 'http://', status: 'in-the-desk', type: 'red', position: 0},
      {id: 14, url: 'http://', status: 'empty', type: 'empty', position: 0}
    ];

  let desks = [];
    return { players, cards, desks };
  }
}
