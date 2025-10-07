import { Component, inject, OnInit } from '@angular/core';
import { GameStore } from '../store/games.store';
import { GameInfoComponent } from '../game-info/game-info.component';
import { GamesPagination } from "../games-pagination/games-pagination";


@Component({
  selector: 'app-games-top-games',
  imports: [GameInfoComponent, GamesPagination],
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

  openInfo() {
    this.showInfo = true;
  }

  closeInfo() {
    this.showInfo = false;
  }
}
