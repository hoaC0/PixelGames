import { Component, inject, OnInit } from '@angular/core';
import { Header } from "../../shared/components/header/header";
import { GameStore } from '../../../store/games.store';

@Component({
  selector: 'app-games-main',
  imports: [
    
  ],
  templateUrl: './games-main.component.html',
  styleUrl: './games-main.component.less'
})
export class GamesMainComponent implements OnInit {

  store = inject(GameStore);

  ngOnInit() {
    this.store.loadAllGames();
  }
}
