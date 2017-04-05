import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent }   from './player/player.component';
import { CardDeskComponent } from './card-desk/card-desk.component';

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: 'players',  component: PlayerComponent },
  { path: 'game', component: CardDeskComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
