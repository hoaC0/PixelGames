import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GameStore } from '../store/games.store';

@Component({
  selector: 'app-games-main-section',
  imports: [],
  templateUrl: './games-main-section.component.html',
  styleUrl: './games-main-section.component.less',
})
export class GamesMainSectionComponent implements OnInit {
  store = inject(GameStore);
  Math = Math;

  nextPageClicked = signal<boolean>(false);

  visibleGames = computed(() => {
    const start = this.store.currentPage() * this.store.gamesPerPage();
    const end = start + this.store.gamesPerPage();
    return this.store.games().slice(start, end);
  });

  ngOnInit() {
    this.store.loadAllGames();

    // this.nextPageAuto()
  }

  nextPageAuto() {
    setInterval(() => {
      this.store.nextPage();
    }, 3000);
  }

  nextPage() {
    this.store.nextPage();
  }
}
