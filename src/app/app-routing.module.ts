import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent }   from './player/player.component';

const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'game',  component: PlayerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
