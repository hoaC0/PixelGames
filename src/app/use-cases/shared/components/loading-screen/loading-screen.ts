import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { GameStore } from '../../../games/store/games.store';

@Component({
  selector: 'app-loading-screen',
  imports: [],
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.less'
})
export class LoadingScreen implements OnInit {

  store = inject(GameStore)

  ngOnInit() {
    
  }

   @Output() close = new EventEmitter<void>();

   onClose() {
    this.close.emit()
   }

}
