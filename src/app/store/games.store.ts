import { inject } from "@angular/core";
import { Game } from "../model/game-store.model";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

const GAMES: Game[] = [
    { id: 1, title: "Helldivers 2", rating: 100, price: "39.99" }
];

type GameState = {
    games: Game[];
    loading: boolean;
    // filter: 
}

const initialState: GameState = {
    games: [],
    loading: false,
}

export const GameStore = signalStore(
  { providedIn: 'root' }, // globally accessible
  withState(initialState),
  withMethods(
    (store) => ({
        
        // get all games
        async loadAllGames() {
            patchState(store, {loading: true})

            // get mocks
            patchState(store, {
                games: GAMES,
                loading:false});
        }

    })
  )
);