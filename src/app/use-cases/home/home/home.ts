import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { HomeMainSection } from "../home-main-section/home-main-section";
import { HomeGamesSection } from "../home-games-section/home-games-section";
import { signal,ChangeDetectionStrategy } from '@angular/core';

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
export class Home implements OnInit {

  ngOnInit() {
   
  }

  // can only be "online" or "offline"
  userstatus = signal<"online" | "offline">("offline");

  toggleOn() {
    this.userstatus.set("online");
    console.log("Status:", this.userstatus());
    // () because signal<>()
  }

  toggleOff() {
    this.userstatus.set("offline");
    console.log("Status:", this.userstatus());
  }

  toggle() {
    if (this.userstatus() === "online") {
      this.toggleOff();
    } else {
      this.toggleOn();
    }
  }

}
