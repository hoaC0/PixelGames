import { Component, inject, OnInit } from '@angular/core';
import { GameStore } from '../../../store/games.store';

@Component({
  selector: 'app-games-main-section',
  imports: [],
  templateUrl: './games-main-section.component.html',
  styleUrl: './games-main-section.component.less'
})
export class GamesMainSectionComponent implements OnInit {
  
  store = inject(GameStore);
  
  ngOnInit() {
    this.store.loadAllGames();
  }

}
