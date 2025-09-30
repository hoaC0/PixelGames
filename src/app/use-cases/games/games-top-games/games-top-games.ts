import { Component, inject, OnInit } from '@angular/core';
import { GameStore } from '../../../store/games.store';

@Component({
  selector: 'app-games-top-games',
  imports: [],
  templateUrl: './games-top-games.html',
  styleUrl: './games-top-games.less'
})
export class GamesTopGames implements OnInit {
  
  store = inject(GameStore);

  ngOnInit() {
    this.store.loadAllGames();
  }
}
