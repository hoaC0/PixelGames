import { inject } from "@angular/core";
import { Game } from "../model/game-store.model";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

const GAMES: Game[] = [
    { id: 1 , name: "Helldivers 2", slug: "helldivers-2" },
];

type GameState = {
    games: Game[];
    loading: boolean;
    currentPage: number;
    gamesPerPage: number;
    // filter: 
}

const initialState: GameState = {
    games: [],
    loading: false,
    currentPage: 0,
    gamesPerPage: 3,
}

//https://www.cheapshark.com/api/1.0/deals?steamRating=80&metacritic=75&pageSize=50

// game URL
const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env['NG_APP_RAWG_API_KEY'];

// game deals URL
const BASE_URL_DEALS = 'https://www.cheapshark.com/api/1.0';

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store) => ({
        async loadAllGames() {
            patchState(store, { loading: true })
            
            try {
                const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=100`);
                const data = await response.json();
                const games = data.results;
               
                console.log("Successfully loaded", games);
                patchState(store, {
                    games,
                    loading: false
                })
            } catch (error) {
              console.error("Error loading games:", error);
              patchState(store, { loading: false })  
            }
        },
        
        nextPage() {
            const maxPage = Math.ceil(store.games().length / store.gamesPerPage()) - 1;
            if (store.currentPage() < maxPage) {
                patchState(store, { currentPage: store.currentPage() + 1 });
            }
        },
        
        prevPage() {
            if (store.currentPage() > 0) {
                patchState(store, { currentPage: store.currentPage() - 1 });
            }
        },
        
        goToPage(page: number) {
            const maxPage = Math.ceil(store.games().length / store.gamesPerPage()) - 1;
            if (page >= 0 && page <= maxPage) {
                patchState(store, { currentPage: page });
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