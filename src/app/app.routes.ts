import { Routes } from '@angular/router';
import { Home } from './use-cases/home/home/home';
import { GamesMainComponent } from './use-cases/games/games-main/games-main.component';

export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: Home },
    { path: "games", component: GamesMainComponent},
    { path: "**", redirectTo: "/home" }
];
