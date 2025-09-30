import { Component, inject, OnInit } from '@angular/core';
import { GamesTopGames } from "../games-top-games/games-top-games";

@Component({
  selector: 'app-games-main',
  imports: [
    GamesTopGames
],
  templateUrl: './games-main.component.html',
  styleUrl: './games-main.component.less'
})
export class GamesMainComponent implements OnInit {

  ngOnInit() {
    
  }
}
