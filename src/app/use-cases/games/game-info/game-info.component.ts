import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [],
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