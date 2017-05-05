import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { CoolStorageModule } from 'angular2-cool-storage';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';

import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule,
    DragulaModule,
    CoolStorageModule,
    Ng2CloudinaryModule
  ],
  providers: [PlayerService, CardService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
