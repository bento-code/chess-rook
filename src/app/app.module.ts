import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { GamesComponent } from './pages/games/games.component';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NgxChessBoardModule } from "ngx-chess-board";
import { NgxChessBoardView } from "ngx-chess-board";
//import { NgxChessBoardService } from "ngx-chess-board";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GameComponent,
    GamesComponent,
    ScoreboardComponent,
    ProfileComponent,
    AnalysisComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChessBoardModule.forRoot(),
    //NgxChessBoardService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
