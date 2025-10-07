import { Component, inject, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { GameStore } from '../store/games.store';


@Component({
  selector: 'app-games-search',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './games-search.html',
  styleUrl: './games-search.less'
})
export class GamesSearch implements OnInit {

  store = inject(GameStore);

  searchTerm = new FormControl<string>('');

  ngOnInit() {
    console.log(this.searchTerm.value)
    // this.store.searchGames(this.searchTerm);
  }
}
