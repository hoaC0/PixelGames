import { Component, inject, OnInit } from '@angular/core';
import { GameStore } from '../store/games.store';
import { GameInfoComponent } from '../game-info/game-info.component';
import { GamesPagination } from "../games-pagination/games-pagination";
import { GamesSearch } from "../games-search/games-search";
import { Game } from '../../../model/game-store.model';


@Component({
  selector: 'app-games-top-games',
  imports: [GameInfoComponent, GamesPagination, GamesSearch],
  templateUrl: './games-top-games.html',
  styleUrl: './games-top-games.less'
})
export class GamesTopGames implements OnInit {
  
  store = inject(GameStore);
  games = this.store.games
  loading = this.store.loading
  showInfo = false;

  ngOnInit() {
    this.store.loadAllGames();
  }

  openInfo(game: Game) {
    this.showInfo = true;
    this.store.loadGameInfo(game);
  }

  closeInfo() {
    this.showInfo = false;
  }
}
