import { Component, inject, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { GameStore } from '../store/games.store';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-games-search',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './games-search.html',
  styleUrl: './games-search.less'
})
export class GamesSearch {
    gameStore = inject(GameStore);
    searchTerm = new FormControl('');
    
    ngOnInit() {
        this.searchTerm.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(term => {
            if (term) {
                this.gameStore.searchGames(term);
            } else {
                this.gameStore.loadAllGames();
            }
        });
    }
}
