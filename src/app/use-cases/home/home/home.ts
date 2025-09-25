import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { HomeMainSection } from "../home-main-section/home-main-section";
import { HomeGamesSection } from "../home-games-section/home-games-section";

@Component({
  selector: 'app-home',
  imports: [
    Header,
    HomeMainSection,
    HomeGamesSection
],
  templateUrl: './home.html',
  styleUrl: './home.less'
})
export class Home {

}
