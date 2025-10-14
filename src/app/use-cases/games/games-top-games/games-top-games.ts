import { Component, inject, OnInit } from '@angular/core';
import { GameStore } from '../store/games.store';
import { GameInfoComponent } from '../game-info/game-info.component';
import { GamesPagination } from "../games-pagination/games-pagination";
import { GamesSearch } from "../games-search/games-search";
import { Game } from '../../../model/game-store.model';
import { LoadingScreen } from "../../shared/components/loading-screen/loading-screen";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideStar } from '@ng-icons/lucide';


@Component({
  selector: 'app-games-top-games',
  imports: [GameInfoComponent, GamesPagination, GamesSearch, LoadingScreen, NgIconComponent],
  providers: [provideIcons({ lucideStar })],
  templateUrl: './games-top-games.html',
  styleUrl: './games-top-games.less'
})
export class GamesTopGames implements OnInit {
  
  store = inject(GameStore);
  games = this.store.games;
  loading = this.store.loading;
  openGameInfo = this.store.openInfo;

  showInfo = this.openGameInfo;

  ngOnInit() {
    this.store.loadAllGames();
  }

  openInfo(game: Game) {
    this.store.loadGameInfo(game);
  }

  closeInfo() {
    this.store.closeInfo();
  }
}