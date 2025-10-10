import { Component, inject } from '@angular/core';
import { GameStore } from '../store/games.store';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { bootstrapEmojiFrown } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-game-deals',
  imports: [NgIcon],
    providers: [
    provideIcons({ lucideX, bootstrapEmojiFrown })
  ],
  templateUrl: './game-deals.html',
  styleUrl: './game-deals.less'
})
export class GameDeals {
  store =  inject(GameStore);
  gameDeals = this.store.gameDeals;
  gameStores = this.store.gameStores;
}
