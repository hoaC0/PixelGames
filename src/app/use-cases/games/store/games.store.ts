import { computed, inject } from "@angular/core";
import { Game } from "../../../model/game-store.model";
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

// TODO: replace fetch with http client
const GAMES: Game[] = [
    { id: 1 , name: "Helldivers 2", slug: "helldivers-2" },
];

type GameState = {
    games: Game[];
    loading: boolean;
    currentPage: number;
    gamesPerPage: number;
    search: string;
    currentPagination: number;
    currentPaginationPages: number[];
    // filter: 
}

const initialState: GameState = {
    games: [],
    loading: false,
    currentPage: 0,
    gamesPerPage: 3,
    search: "",
    currentPagination: 1,
    currentPaginationPages: [1, 2, 3, 4, 5]
}

// https://www.cheapshark.com/api/1.0/deals?steamRating=80&metacritic=75&pageSize=50

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
        // initially
        async loadAllGames() {
            patchState(store, { loading: true })
            console.log("STORE.....", store.currentPagination() )
            
            try {
                const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=&page=${store.currentPagination()}&page_size=40`);
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
        
        //
        // carousel
        //
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

        // 
        // SEARCH
        // 
        async searchGames(searchTerm: string) {
            patchState(store, { loading: true });
            try {
                patchState(store, { loading: false, search: searchTerm });
                this.displayCurrentPaginationPage();
                console.log("Search:", searchTerm)
            } catch {
                console.error("Error");
            }
        },

        //
        // PAGINATION
        //
        async displayCurrentPaginationPage() {
            const currentPage = store.currentPagination();
            if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
                patchState(store, {
                    currentPaginationPages: [ 1, 2, 3, 4, 5 ]
                });
            } else {
                patchState(store, {
                    currentPaginationPages: [
                        currentPage -2,
                        currentPage -1,
                        currentPage,
                        currentPage + 1,
                        currentPage + 2,
                    ]
                })
            }

            try {
                const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${store.search()}&page=${store.currentPagination()}&page_size=40`);
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

        async nextPagination() {
            if ( store.currentPagination() > 0 ) { // replace 0 with max value
                patchState(store, { loading: true, currentPagination: store.currentPagination() + 1, })
                console.log("NEXT: ", store.currentPagination())
            } else {
                console.log("max already")
                // CONDITION
                // css disable arrow button 
            }
            this.displayCurrentPaginationPage();
        },

        async prevPagination() {
            if ( store.currentPagination() > 1 ) {
                patchState(store, { loading: true, currentPagination: store.currentPagination() - 1 })
            } else {
                console.log("min already")
                // CONDITION
                // css disable arrow button 
            }
            this.displayCurrentPaginationPage()
        },

        async goToPagination(page: number) {
            const currentPage = page;
            patchState(store, { loading: true, currentPagination: currentPage });
            this.displayCurrentPaginationPage()
        },

        loadGame() {

        }

    }))
);