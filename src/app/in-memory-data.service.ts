import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let players = [
      {id: 1, name: 'Player 1', isJudge: false},
      {id: 2, name: 'Player 2', isJudge: false},
      {id: 3, name: 'Player 3', isJudge: false}
    ];
    return {players};
  }
}
