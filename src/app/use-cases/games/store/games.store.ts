import { computed, inject } from "@angular/core";
import { Game } from "../../../model/game-store.model";
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { GameDeals } from "../../../model/game-store-deals.model";
import { GameStores } from "../../../model/game-store-stores.model";
import { GamesService } from "../games.service";
import { Reviews } from "../../../model/game-store-reviews.model";

type GameState = {
    games: Game[];
    topGames: Game[];
    gameInfo: Game | null;
    gameDescription: string;
    gameDeals: GameDeals[] | null;
    gameStores: GameStores[] | null;
    gameReviews: Reviews | null;
    gameReviewPagination: number[];
    currentGame: number | null;
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
    carouselAutoRotate: boolean;
}

const initialState: GameState = {
    games: [],
    topGames: [],
    gameInfo: null,
    gameDescription: "",
    gameDeals: null,
    gameStores: null,
    gameReviews: null,
    gameReviewPagination: [1, 2, 3],
    currentGame: null,
    currentgameReviewPagination: 1,
    storeLogos: [],
    openInfo: false,
    loading: false,
    error: false,
    currentPage: 0,
    gamesPerPage: 3,
    search: "",
    currentPagination: 1,
    currentPaginationPages: [1, 2, 3, 4, 5],
    carouselAutoRotate: true
}

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const gameService = inject(GamesService);
    return {
        // Load top 15 games with high ratings
        async loadTopGames() {
            patchState(store, { loading: true });
            try {
                const topGames = await gameService.getTopGames();
                patchState(store, {
                    topGames,
                    loading: false,
                    currentPage: 0
                });
            } catch (error) {
                console.error("Error loading top games:", error);
                patchState(store, { loading: false });
            }
        },

        // initially
        async loadAllGames() {
            const games = await gameService.getAllGames();
            patchState(store, { loading: true })
            try {
                this.getStores();
                await this.loadTopGames(); // Load top games for carousel
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

        // carousel with automatic rotation
        nextPage() {
            const maxPage = Math.ceil(store.topGames().length / store.gamesPerPage()) - 1;
            const nextPage = store.currentPage() < maxPage ? store.currentPage() + 1 : 0;
            patchState(store, { currentPage: nextPage });
        },
        
        prevPage() {
            const maxPage = Math.ceil(store.topGames().length / store.gamesPerPage()) - 1;
            const prevPage = store.currentPage() > 0 ? store.currentPage() - 1 : maxPage;
            patchState(store, { currentPage: prevPage });
        },
        
        goToPage(page: number) {
            const maxPage = Math.ceil(store.topGames().length / store.gamesPerPage()) - 1;
            if (page >= 0 && page <= maxPage) {
                patchState(store, { currentPage: page });
            }
        },

        setAutoRotate(value: boolean) {
            patchState(store, { carouselAutoRotate: value });
        },

        // SEARCH
        async searchGames(searchTerm: string) {
            patchState(store, { loading: true });
            try {
                patchState(store, { loading: false, search: searchTerm + "&search_exact=true"}); 
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

        async nextPagination() {
            if ( store.currentPagination() > 0 ) {
                patchState(store, { loading: true, currentPagination: store.currentPagination() + 1, })
            } else {
                console.log("max already")
            }
            this.displayCurrentPaginationPage();
        },

        async prevPagination() {
            if ( store.currentPagination() > 1 ) {
                patchState(store, { loading: true, currentPagination: store.currentPagination() - 1 })
            } else {
                console.log("min already")
            }
            this.displayCurrentPaginationPage()
        },

        async goToPagination(page: number) {
            const currentPage = page;
            patchState(store, { loading: true, currentPagination: currentPage });
            this.displayCurrentPaginationPage()
        },

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
        
        getMaxReviewPages() {
            const reviews = store.gameReviews();
            if (!reviews) return 1;
            const pages = Math.ceil(reviews.count / 3);
            return pages > 0 ? pages : 1;
        },
        
        updateReviewPaginationArray(currentPage: number) {
            const maxPages = this.getMaxReviewPages();
            if (currentPage === 1) {
                patchState(store, { gameReviewPagination: [1, 2, 3].filter(p => p <= maxPages) });
            } else if (currentPage === 2) {
                patchState(store, { gameReviewPagination: [1, 2, 3].filter(p => p <= maxPages) });
            } else if (currentPage >= maxPages - 1) {
                const arr = [maxPages - 2, maxPages - 1, maxPages].filter(p => p > 0);
                patchState(store, { gameReviewPagination: arr });
            } else {
                patchState(store, { gameReviewPagination: [currentPage - 1, currentPage, currentPage + 1] });
            }
        },
        
        async getReviews(gameID: number) {
            patchState(store, { loading: true });
            try {
                const reviews = await gameService.getReviews(1, gameID);
                console.log("Reviews", reviews);
                patchState(store, { loading: false, gameReviews: reviews, currentGame: gameID, currentgameReviewPagination: 1 });
                this.updateReviewPaginationArray(1);
            } catch {
                patchState(store, { loading: false });
            }
        },
        
        async nextReview(page: number) {
            const gameID = store.currentGame();
            if (!gameID) {
                console.error("No game ID available");
                return;
            }
            const maxPages = this.getMaxReviewPages();
            const nextPage = page + 1;
            if (nextPage > maxPages) {
                console.log("Already at max page");
                return;
            }
            
            patchState(store, { loading: true });
            try {
                const reviews = await gameService.getReviews(nextPage, gameID);
                console.log(reviews);
                patchState(store, { 
                    loading: false, 
                    gameReviews: reviews, 
                    currentgameReviewPagination: nextPage 
                });
                this.updateReviewPaginationArray(nextPage);
            } catch {
                patchState(store, { loading: false });
                console.error("Error loading Reviews");
            }
        },
        
        async prevReview(page: number) {
            const gameID = store.currentGame();
            if (!gameID) {
                console.error("No game ID available");
                return;
            }
            const prevPage = page - 1;
            if (prevPage < 1) {
                console.log("Already at first page");
                return;
            }
            
            patchState(store, { loading: true });
            try {
                const reviews = await gameService.getReviews(prevPage, gameID);
                console.log(reviews);
                patchState(store, { 
                    loading: false, 
                    gameReviews: reviews, 
                    currentgameReviewPagination: prevPage 
                });
                this.updateReviewPaginationArray(prevPage);
            } catch {
                patchState(store, { loading: false });
                console.error("Error loading Reviews");
            }
        },
        
        async goToReview(page: number) {
            const gameID = store.currentGame();
            if (!gameID) {
                console.error("No game ID available");
                return;
            }
            const maxPages = this.getMaxReviewPages();
            if (page < 1 || page > maxPages) {
                console.log(`Page ${page} out of bounds (1-${maxPages})`);
                return;
            }
            
            patchState(store, { loading: true });
            try {
                const reviews = await gameService.getToReview(page, gameID);
                console.log(reviews);
                patchState(store, { 
                    loading: false, 
                    gameReviews: reviews, 
                    currentgameReviewPagination: page 
                });
                this.updateReviewPaginationArray(page);
            } catch {
                patchState(store, { loading: false });
                console.error("Error loading Reviews");
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