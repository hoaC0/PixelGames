import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { bootstrapEmojiFrown } from '@ng-icons/bootstrap-icons';
import { GameStore } from '../store/games.store';
import { Game } from '../../../model/game-store.model';


@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [
    NgIconComponent
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
  gameDeals = this.store.gameDeals;
  gameStores = this.store.gameStores;

  ngOnInit() {
    console.log("STOR ", this.gameInfo())
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