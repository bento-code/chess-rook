import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { GameComponent } from './pages/game/game.component';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';

  
const routes: Routes = [
  {path: "app-login", component: LoginComponent},
  {path: "app-register", component: RegisterComponent},
  {path: "app-home", component: HomeComponent},
  {path: "app-game", component: GameComponent},
  {path: "app-games", component: GamesComponent},
  {path: "app-profile", component: ProfileComponent},
  {path: "app-scoreboard", component: ScoreboardComponent},
  {path: "app-analysis", component: AnalysisComponent},
  {path: "app-navbar", component: NavbarComponent},
  {path: "**", redirectTo: "/app-login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
