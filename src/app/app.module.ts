import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { CoolStorageModule } from 'angular2-cool-storage';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { GameComponent } from './game/game.component';

import { PlayerService } from './player/player.service';
import { CardService } from './card/card.service';
import { GameService } from './game/game.service';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    DragulaModule,
    CoolStorageModule
  ],
  providers: [PlayerService, CardService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
