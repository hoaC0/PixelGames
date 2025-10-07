import { computed, inject } from "@angular/core";
import { Game } from "../../../model/game-store.model";
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

const GAMES: Game[] = [
    { id: 1 , name: "Helldivers 2", slug: "helldivers-2" },
];

type GameState = {
    games: Game[];
    loading: boolean;
    currentPage: number;
    gamesPerPage: number;
    currentPagination: number;
    currentPaginationPages: number[];
    // filter: 
}

const initialState: GameState = {
    games: [],
    loading: false,
    currentPage: 0,
    gamesPerPage: 3,
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
  withComputed(({games}) => ({
     gamesCount: computed(() => games().length)
  })),
  withMethods(
    (store) => ({
        async loadAllGames() {
            patchState(store, { loading: true })
            console.log("STORE.....", store.currentPagination() )
            
            try {
                const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${store.currentPagination()}&page_size=40`);
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
        },

        async nextPagination() {
            if ( store.currentPagination() > 0 ) { // replace 0 with max value
                patchState(store, { loading: true, currentPagination: store.currentPagination() + 1, })
                console.log("NEXT: ", store.currentPagination())

                try {
                    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${store.currentPagination()}&page_size=40`);
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
            } else {
                console.log("max already")
                // CONDITION
                // css disable arrow button 
            }
            this.displayCurrentPaginationPage();
        },

        // 
        async prevPagination() {
            if ( store.currentPagination() > 1 ) {
                patchState(store, { loading: true, currentPagination: store.currentPagination() - 1 })
                console.log("PREV: ", store.currentPagination())

                try {
                    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${store.currentPagination()}&page_size=40`);
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
            } else {
                console.log("min already")
                // CONDITION
                // css disable arrow button 
            }
            this.displayCurrentPaginationPage()
        },

        // TODO: ARRAY(5) erstellen mit + und -
        async goToPagination() {
            try {

            } catch {

            }
        },

        async searchGames(searchTerm: string) {
            patchState(store, { loading: true })
            
            try {
                const search = searchTerm;
                const responese = await fetch(`${BASE_URL}/games?title=${search}`)
                const games = await responese.json();

                console.log("Search successful");
                patchState(store, {
                    games,
                    loading: false,
            })

            } catch {
                console.error("Error while loading search");
                patchState(store, { loading: false })
            }
        },


        loadGame() {

        }

    }))
);