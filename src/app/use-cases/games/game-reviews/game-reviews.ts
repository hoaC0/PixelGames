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
    const reviews = this.reviews();
    if (reviews) {
      this.PagesPagination = Math.ceil(reviews.count / 3);
      console.log("count: ", reviews.count);
      console.log("total pages: ", this.PagesPagination);
      console.log("current page: ", this.currentPagination());
    }
  }

  nextPage() {
    const currentPage = this.currentPagination();
    if (currentPage < this.PagesPagination) {
      this.store.nextReview(currentPage);
      console.log("mov to page: ", currentPage + 1)
    } else {
      console.log("alr at max page: ", this.PagesPagination);
    }
  }
  
  prevPage() {
    const currentPage = this.currentPagination();
    if (currentPage > 1) {
      this.store.prevReview(currentPage);
      console.log("moving to page: ", currentPage - 1)
    } else {
      console.log("already at first page");
    }
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.PagesPagination) {
      this.store.goToReview(page);
      console.log("Going to page: ", page);
    } else {

    }
  }
}