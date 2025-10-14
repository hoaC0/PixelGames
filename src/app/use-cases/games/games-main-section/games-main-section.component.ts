import { Component, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { GameStore } from '../store/games.store';

@Component({
  selector: 'app-games-main-section',
  imports: [],
  templateUrl: './games-main-section.component.html',
  styleUrl: './games-main-section.component.less'
})
export class GamesMainSectionComponent implements OnInit, OnDestroy {
  
  store = inject(GameStore);
  Math = Math;
  
  private autoRotateInterval?: number;
  progressPercentage = 0;
  private progressInterval?: number;

  visibleGames = computed(() => {
    const start = this.store.currentPage() * this.store.gamesPerPage();
    const end = start + this.store.gamesPerPage();
    return this.store.topGames().slice(start, end);
  });

  totalPages = computed(() => 
    Math.ceil(this.store.topGames().length / this.store.gamesPerPage())
  );

  ngOnInit() {
    this.store.loadAllGames();
    this.startAutoRotation();
  }

  ngOnDestroy() {
    this.stopAutoRotation();
  }

  startAutoRotation() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    this.progressPercentage = 0;
    
    
    this.progressInterval = window.setInterval(() => {
      this.progressPercentage += 1.25; // 100 / 80 steps
      if (this.progressPercentage >= 100) {
        this.progressPercentage = 100;
      }
    }, 100);

    // auto every 8 seconds
    this.autoRotateInterval = window.setInterval(() => {
      this.store.nextPage();
      this.progressPercentage = 0;
    }, 8000);
  }

  stopAutoRotation() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = undefined;
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = undefined;
    }
  }

  manualNavigation(direction: 'next' | 'prev') {
    // stop auto-rotation when manual
    this.stopAutoRotation();
    
    if (direction === 'next') {
      this.store.nextPage();
    } else {
      this.store.prevPage();
    }

    // restart
    setTimeout(() => {
      this.startAutoRotation();
    }, 100);
  }

  goToPage(page: number) {
    this.stopAutoRotation();
    this.store.goToPage(page);
    setTimeout(() => {
      this.startAutoRotation();
    }, 100);
  }
}