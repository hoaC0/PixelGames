import { Component, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { GameStore } from '../store/games.store';
import { Game } from '../../../model/game-store.model';
import { LoadingScreen } from "../../shared/components/loading-screen/loading-screen";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideStar } from '@ng-icons/lucide';

@Component({
  selector: 'app-games-main-section',
  imports: [LoadingScreen, NgIconComponent],
  providers: [provideIcons({ lucideStar })],
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
    return this.store.topGames().slice(start, end);
  });
  ngOnInit() {
    this.store.loadTopGames();
    this.startCarousel();
  }
  ngOnDestroy() {
    this.stopCarousel();
  }
  startCarousel() {
    this.carouselInterval = setInterval(() => {
      const maxPage = Math.ceil(this.store.topGames().length / this.store.gamesPerPage()) - 1;
      if (this.store.currentPage() < maxPage) {
        this.store.nextPage();
      } else {
        this.store.goToPage(0); // loop back
      }
    }, 6000);
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