import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Card } from './card';

@Injectable()
export class CardService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private cardsUrl = 'api/cards';  // URL to web api

  constructor(private http: Http) { }

  getCards(): Promise<Card[]> {
    return this.http.get(this.cardsUrl)
               .toPromise()
               .then(response => response.json().data as Card[])
               .catch(this.handleError);
  }

  getCard(id: number): Promise<Card> {
    const url = `${this.cardsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Card)
      .catch(this.handleError);
  }

  update(card: Card): Promise<Card> {
    const url = `${this.cardsUrl}/${card.id}`;
    return this.http
      .put(url, JSON.stringify(card), {headers: this.headers})
      .toPromise()
      .then(() => card)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}