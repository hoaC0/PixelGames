import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { bootstrapEmojiFrown } from '@ng-icons/bootstrap-icons';
import { GameStore } from '../store/games.store';
import { Game } from '../../../model/game-store.model';
import { GameReviews } from "../game-reviews/game-reviews";
import { GameDeals } from "../game-deals/game-deals";


@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [
    NgIconComponent,
    GameReviews,
    GameDeals
],
  providers: [
    provideIcons({ lucideX, bootstrapEmojiFrown })
  ],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.less'
})
export class GameInfoComponent implements OnInit{
  
  store =  inject(GameStore);
  gameInfo = this.store.gameInfo;
  gameDescription = this.store.gameDescription;

  ngOnInit() {
  
  }

  // parent component can listen
  // emits void when triggered
  @Output() close = new EventEmitter<void>();

  // event to notify the parent component
  onClose() {
    this.close.emit();
    this.store.unloadDescription();
  }
}