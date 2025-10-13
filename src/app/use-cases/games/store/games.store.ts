import { computed, inject } from "@angular/core";
import { Game } from "../../../model/game-store.model";
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { GameDeals } from "../../../model/game-store-deals.model";
import { GameStores } from "../../../model/game-store-stores.model";
import { GamesService } from "../games.service";
import { Reviews } from "../../../model/game-store-reviews.model";

// TODO: replace fetch with http client
type GameState = {
    games: Game[];
    gameInfo: Game | null;
    gameDescription: string;
    gameDeals: GameDeals[] | null;
    gameStores: GameStores[] | null;
    gameReviews: Reviews | null;
    gameReviewPagination: number[];
    currentgameReviewPagination: number;
    storeLogos: string[];
    openInfo: boolean;
    loading: boolean;
    error: boolean;
    currentPage: number;
    gamesPerPage: number;
    search: string;
    currentPagination: number;
    currentPaginationPages: number[];
    // filter: 
}

const initialState: GameState = {
    games: [],
    gameInfo: null,
    gameDescription: "",
    gameDeals: null,
    gameStores: null,
    gameReviews: null,
    gameReviewPagination: [1, 2, 3],
    currentgameReviewPagination: 1,
    storeLogos: [],
    openInfo: false,
    loading: false,
    error: false,
    currentPage: 0,
    gamesPerPage: 3,
    search: "",
    currentPagination: 1,
    currentPaginationPages: [1, 2, 3, 4, 5]
}
export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const gameService = inject(GamesService);
    return {
        // initially
        async loadAllGames() {
            const games = await gameService.getAllGames();
            patchState(store, { loading: true })
            try {
                this.getStores();
                patchState(store, {
                    games,
                    loading: false
                })
            } catch (error) {
              console.error("Error loading games:", error);
              patchState(store, { loading: false })  
            }
        },
        
        async loadCarousel() {
            patchState(store, {loading: true});
            try {
                patchState(store, {loading: false});
            } catch {
                patchState(store, {loading: false});
            }
        },

        // carousel
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

        // SEARCH
        async searchGames(searchTerm: string) {
            patchState(store, { loading: true });
            try {
                patchState(store, { loading: false, search: searchTerm + "&search_exact=true"}); // TODO: optimise search
                this.displayCurrentPaginationPage();
            } catch {
                console.error("Error");
            }
        },

        // PAGINATION
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
                const search = store.search();
                const currentPagination = store.currentPagination();
                const games = await gameService.getCurrentPaginationPage(search, currentPagination)
                patchState(store, {
                    games,
                    loading: false
                })
            } catch (error) {
                console.error("Error loading games:", error);
                patchState(store, { loading: false })  
            }
        },

        // TODO FIX PAGINATION 
        async nextPagination() {
            if ( store.currentPagination() > 0 ) { // replace 0 with max value
                patchState(store, { loading: true, currentPagination: store.currentPagination() + 1, })
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

        // 
        //  GameInfo
        // 
        async getDescription(gameID: number) {
            patchState( store, { loading: true })
            try {
                const games = await gameService.getDescription(gameID);
                patchState(store, { loading: false, gameDescription: games.description_raw })
            } catch {
                console.error("Error loading description")
            }
        },
        unloadDescription() {
            patchState(store, { loading: false, gameDescription: "" })
        },

        async loadGameInfo(game: Game) {
            patchState(store, { loading: true });
            try {
                //TODO: Maybe add timeout??
                // waits for both, to make sure they arrive
                await Promise.all([
                    this.getDescription(game.id),
                    this.checkForDeals(game.name),
                    this.getReviews(game.id)
                ]);
                patchState(store, {loading: false, gameInfo: game, openInfo: true })
            } catch {
                console.log("ERROR")
            }
        },

        async checkForDeals(game: string) {
            patchState(store, { loading: true })
            try {
                const dealsList = await gameService.getDeals(game);
                patchState(store, { loading: false, gameDeals: dealsList.deals })
            } catch {
                patchState(store, { loading: false })
                console.error("ERROR loading deals");
            }
        },

        initialReview() {
            patchState(store, { gameReviewPagination: initialState.gameReviewPagination, currentgameReviewPagination: initialState.currentgameReviewPagination });
        },
        async getReviews(gameID: number) {
            patchState(store, { loading: true });
            try {
                const reviews = await gameService.getReviews(gameID);
                console.log("Reviews", reviews);
                patchState(store, { loading: false, gameReviews: reviews});
            } catch {
                patchState(store, { loading: false });
            }
        },
        async nextReview(page: number, next: string) {
            patchState(store, { loading: true });
            try {
                const reviews = await gameService.getNextReviews(next);
                console.log(reviews);
                patchState(store, { loading: false, gameReviews: reviews, currentgameReviewPagination: page, gameReviewPagination: [page - 1, page, page + 1] })
            } catch {
                patchState(store, { loading: false });
                console.error( "Error loading Reviews");
            }
        },
        async prevReview(page: number, prev: string) {
            patchState(store, { loading: true });
            try {
                const reviews = await gameService.getNextReviews(prev);
                console.log(reviews);
                patchState(store, { loading: false, gameReviews: reviews, currentgameReviewPagination: page, gameReviewPagination: [page - 1, page, page + 1] })
            } catch {
                patchState(store, { loading: false });
                console.error( "Error loading Reviews");
            }
        },
        async goToReview(page: number, gameID: number) {
            patchState(store, { loading: true });
            try {
                const reviews = await gameService.getToReview(page, gameID);
                console.log(reviews);
                patchState(store, { loading: false, gameReviews: reviews, currentgameReviewPagination: page,  gameReviewPagination: [page - 1, page, page + 1] });
            } catch {
                patchState(store, { loading: false });
                console.error( "Error loading Reviews");
            }
        },

        async getStores() {
            patchState(store, { loading: true })
            try {   
                const stores = await gameService.getAllStores();
                patchState(store, { loading: false, gameStores: stores})
            } catch {
                console.error("ERROR loading stores");
                patchState(store, { loading: false });
            }
        },

        closeInfo() {
            patchState(store, { loading: false, openInfo: false })
        },
    };
  })
);