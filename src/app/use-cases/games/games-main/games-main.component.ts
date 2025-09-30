import { Component, inject, OnInit } from '@angular/core';
import { GamesTopGames } from "../games-top-games/games-top-games";
import { Header } from "../../shared/components/header/header";
import { GamesMainSectionComponent } from '../games-main-section/games-main-section.component';

@Component({
  selector: 'app-games-main',
  imports: [
    GamesTopGames,
    Header,
    GamesMainSectionComponent
],
  templateUrl: './games-main.component.html',
  styleUrl: './games-main.component.less'
})
export class GamesMainComponent implements OnInit {

  ngOnInit() {
    
  }
}
