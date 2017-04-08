import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let players = [
      {id: 1, name: 'Player 1', isJudge: false, points: 0},
      {id: 2, name: 'Player 2', isJudge: false, points: 0},
      {id: 3, name: 'Player 3', isJudge: false, points: 0}
    ];

    let cards = [
      {id: 1, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0, cardIds: []},
      {id: 2, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0, cardIds: []},
      {id: 3, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0, cardIds: []},
      {id: 4, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0, cardIds: []},
      {id: 5, url: 'http://', status: 'in-the-desk', type: 'red', position: 0, cardIds: []},
      {id: 6, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0, cardIds: []},
      {id: 7, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0, cardIds: []},
      {id: 8, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0, cardIds: []},
      {id: 9, url: 'http://', status: 'in-the-desk', type: 'red', position: 0, cardIds: []},
      {id: 10, url: 'http://', status: 'in-the-desk', type: 'usual', position: 0, cardIds: []}
    ];
    return { players, cards };
  }
}
