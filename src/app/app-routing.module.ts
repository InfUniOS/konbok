import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { PenalitiesComponent } from './penalities/penalities.component';
import { SessionsComponent } from './sessions/sessions.component';

const routes: Routes = [
  { path: 'sessions', component: SessionsComponent },
  { path: 'players', component: PlayersComponent},
  { path: '', component: HomeComponent },
  { path: 'penalities', component: PenalitiesComponent }
]

@NgModule({
  exports: [
    RouterModule
  ],
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
