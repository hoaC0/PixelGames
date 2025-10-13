import { Component, inject, OnInit } from '@angular/core';
import { GameStore } from '../store/games.store';

@Component({
  selector: 'app-game-reviews',
  imports: [],
  templateUrl: './game-reviews.html',
  styleUrl: './game-reviews.less'
})
export class GameReviews implements OnInit {
  store = inject(GameStore);
  reviews = this.store.gameReviews;
  page = this.store.gameReviewPagination;
  currentPagination = this.store.currentgameReviewPagination;
  PagesPagination = 0;

  ngOnInit() {
    this.store.initialReview();
    const pages = Math.floor(this.reviews()!.count / 3);
    const additionalPage = this.reviews()!.count % 3;
    this.PagesPagination = pages;
    const count = this.reviews()!.count;
    if( additionalPage != 0) {
      this.PagesPagination = this.PagesPagination + 1;
    }
    console.log("count ", count);
    console.log("total Pages: ", this.PagesPagination);
    console.log(this.currentPagination());
    console.log(this.reviews()!.next);
  }

  nextPage() {
    this.store.nextReview(this.currentPagination() + 1, this.reviews()!.next ?? "")
  }
  prevPage() {
    this.store.prevReview(this.currentPagination() - 1, this.reviews()!.next ?? "")
  }
  goToPage(page: number) {
    this.store.goToReview(
      page ?? 0, 
      this.reviews()?.results[0]?.game ?? 0
    );
  }
}