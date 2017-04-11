import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula'

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { DeskComponent } from './desk/desk.component';

import { PlayerService } from './player/player.service';
import { PlayService } from './play.service';
import { CardService } from './card/card.service';
import { DeskService } from './desk/desk.service';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    DeskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    DragulaModule
  ],
  providers: [PlayerService, PlayService, CardService, DeskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
