import { Component, inject } from '@angular/core';
import { GameStore } from '../store/games.store';

@Component({
  selector: 'app-game-reviews',
  imports: [],
  templateUrl: './game-reviews.html',
  styleUrl: './game-reviews.less'
})
export class GameReviews {
  store = inject(GameStore);
  reviews = this.store.gameReviews;
  
  constructor() {
    console.log(this.reviews()!.results[0]);
  }
}
