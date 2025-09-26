import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-practice-signals',
  imports: [],
  templateUrl: './practice-signals.component.html',
  styleUrl: './practice-signals.component.less'
})
export class PracticeSignalsComponent {

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
