import { Component, inject } from '@angular/core';
import { GameStore } from '../store/games.store';

@Component({
  selector: 'app-games-pagination',
  imports: [],
  templateUrl: './games-pagination.html',
  styleUrl: './games-pagination.less'
})
export class GamesPagination {

  store = inject(GameStore);

  nextPage() {
    this.store.nextPagination();
  }

  prevPage() {
    this.store.prevPagination();
  }

  currentPagination(page: number) {
    this.store.goToPagination(page);
  }
}
