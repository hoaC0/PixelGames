import { inject } from "@angular/core";
import { Game } from "../model/game-store.model";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

const GAMES: Game[] = [
    { id: "1", title: "Helldivers 2", steamRatingText: "Very positive", normalPrice: "39.99" }
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

//https://www.cheapshark.com/api/1.0/deals?steamRating=80&metacritic=75&pageSize=50

// game URL
const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env['NG_APP_RAWG_API_KEY'];

// game deals URL
const BASE_URL_DEALS = 'https://www.cheapshark.com/api/1.0';

export const GameStore = signalStore(
  { providedIn: 'root' }, // globally accessible
  withState(initialState),
  withMethods(
    (store) => ({
        
        // get top games
        async loadAllGames() {
            patchState(store, { loading: true })

            // get mocks
            // patchState(store, {
            //     games: GAMES,
            //     loading:false});

            try {
                const response = await fetch(`${BASE_URL}/games`);
                const games = await response.json();
                
                console.log("Successfully loaded")
                patchState(store, {
                games,
                loading: false})
            } catch {
              console.error("Error while loading files");
              patchState(store, { loading: false })  
            }
        },

        async searchGames() {
            patchState(store, { loading: true })
            
            try {
                const search = "batman"; // replace batman with form var
                const repsone = await fetch(`${BASE_URL}/games?title=${search}`)
                const games = await repsone.json();

                console.log("Search successful");
                patchState(store, {
                    games,
                    loading: false,
            })

            } catch {
                console.error("Error while loading search");
                patchState(store, { loading: false })
            }
        }
    }))
);