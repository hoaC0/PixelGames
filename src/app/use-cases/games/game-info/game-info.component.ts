import { Component, Output, EventEmitter } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';


@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [
    NgIconComponent
  ],
  providers: [
    provideIcons({ lucideX })
  ],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.less'
})
export class GameInfoComponent {

  // parent component can listen
  // emits void when triggered
  @Output() close = new EventEmitter<void>();

  // event to notify the parent component
  onClose() {
    this.close.emit();
  }
}