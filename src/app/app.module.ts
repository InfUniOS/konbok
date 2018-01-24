import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { SessionsComponent } from './sessions/sessions.component';
import { PenalitiesComponent } from './penalities/penalities.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialAppModule } from './material.module';
import { AppRoutingModule } from './/app-routing.module';
import { DbService } from './db.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    SessionsComponent,
    PenalitiesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialAppModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
