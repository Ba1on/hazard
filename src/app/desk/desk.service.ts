import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Desk } from './desk';

@Injectable()
export class DeskService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private desksUrl = 'api/desks';  // URL to web api

  constructor(private http: Http) { }

  getDesks(): Promise<Desk[]> {
    return this.http.get(this.desksUrl)
               .toPromise()
               .then(response => response.json().data as Desk[])
               .catch(this.handleError);
  }

  getDesk(id: number): Promise<Desk> {
    const url = `${this.desksUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Desk)
      .catch(this.handleError);
  }

  create(userId: number, cards): Promise<Desk> {
    return this.http
      .post(this.desksUrl, JSON.stringify({userId: userId, cards: cards}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Desk)
      .catch(this.handleError);
  }

  update(desk: Desk): Promise<Desk> {
    const url = `${this.desksUrl}/${desk.id}`;
    return this.http
      .put(url, JSON.stringify(desk), {headers: this.headers})
      .toPromise()
      .then(() => desk)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}