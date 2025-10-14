import { Component, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { GameStore } from '../store/games.store';
import { Game } from '../../../model/game-store.model';
import { LoadingScreen } from "../../shared/components/loading-screen/loading-screen";

@Component({
  selector: 'app-games-main-section',
  imports: [LoadingScreen],
  templateUrl: './games-main-section.component.html',
  styleUrl: './games-main-section.component.less'
})
export class GamesMainSectionComponent implements OnInit, OnDestroy {
  
  store = inject(GameStore);
  Math = Math;
  private carouselInterval: any;

  visibleGames = computed(() => {
    const start = this.store.currentPage() * this.store.gamesPerPage();
    const end = start + this.store.gamesPerPage();
    return this.store.games().slice(start, end);
  });

  ngOnInit() {
    this.store.loadAllGames();
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      const maxPage = Math.ceil(this.store.games().length / this.store.gamesPerPage()) - 1;
      if (this.store.currentPage() < maxPage) {
        this.store.nextPage();
      } else {
        this.store.goToPage(0);
      }
    }, 8000); // 8 seconds
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  openInfo(game: Game) {
    this.store.loadGameInfo(game);
  }

  closeInfo() {
    this.store.closeInfo();
  }

}