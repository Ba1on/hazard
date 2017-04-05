import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { CardDeskComponent } from './card-desk/card-desk.component';

import { PlayerService } from './player/player.service';
import { PlayService } from './play.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    CardDeskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [PlayerService, PlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
