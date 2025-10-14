import { Component, computed, inject, OnInit } from '@angular/core';
import { GameStore } from '../store/games.store';
import { Game } from '../../../model/game-store.model';

@Component({
  selector: 'app-games-main-section',
  imports: [],
  templateUrl: './games-main-section.component.html',
  styleUrl: './games-main-section.component.less'
})
export class GamesMainSectionComponent implements OnInit {
  
  store = inject(GameStore);
  Math = Math;

  visibleGames = computed(() => {
    const start = this.store.currentPage() * this.store.gamesPerPage();
    const end = start + this.store.gamesPerPage();
    return this.store.games().slice(start, end);
  });

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