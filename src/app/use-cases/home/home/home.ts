import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { HomeMainSection } from "../home-main-section/home-main-section";
import { HomeGamesSection } from "../home-games-section/home-games-section";
import { signal,ChangeDetectionStrategy } from '@angular/core';
import { PracticeSignalsComponent } from "../../practice/practice-signals/practice-signals.component";
import { AsyncDataSignals } from "../../practice/async-data-signals/async-data-signals";

@Component({
  selector: 'app-home',
  imports: [
    Header,
    HomeMainSection,
    HomeGamesSection,
    // AsyncDataSignals
],
  templateUrl: './home.html',
  styleUrl: './home.less'
})
export class Home implements OnInit {

  ngOnInit() {
   
  }
}
