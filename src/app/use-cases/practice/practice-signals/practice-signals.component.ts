import { Component, signal, ChangeDetectionStrategy, computed, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-practice-signals',
  imports: [],
  templateUrl: './practice-signals.component.html',
  styleUrl: './practice-signals.component.less'
})
export class PracticeSignalsComponent {

  // can only be "online" or "offline"
  userstatus = signal<"online" | "offline" | "away">("offline");

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

  notificationEnabled = computed(() => this.userstatus() === "online");

  statusMessage = linkedSignal(() => {
    debugger;
    const status = this.userstatus();
    console.log(status);
    
    switch (status) {
      case "online": return "Available for meetings and messages";
      case "offline": return "Inactive";
      case "away": return "Temporarily away, check back later";
      default: return "Status unknown";
    }
  });

}
