import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


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
import {AuthInterceptor} from "./models/auth-interceptor";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { GameOverModalComponent } from './pages/game-over-modal/game-over-modal.component';
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
    NavbarComponent,
    GameOverModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChessBoardModule.forRoot(),
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    //NgxChessBoardService
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
