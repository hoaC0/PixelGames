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

  imageURL = "https://cdn.steamstatic.com/steam/apps/";
  game_card = "capsule_616x353.jpg";

  ngOnInit() {
    this.store.loadAllGames();
  }

}
