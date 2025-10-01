import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.less'
})
export class GameInfoComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}