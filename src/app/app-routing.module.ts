import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent }   from './player/player.component';
import { DeskComponent } from './desk/desk.component';

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: 'players',  component: PlayerComponent },
  { path: 'game', component: DeskComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
