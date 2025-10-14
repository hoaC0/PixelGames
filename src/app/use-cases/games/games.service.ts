import { Injectable, resource } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GamesService {

  // game URL
  private BASE_URL = 'https://api.rawg.io/api';
  private API_KEY = import.meta.env['NG_APP_RAWG_API_KEY'];

  // game deals URL
  private CHEAPSHARK_URL_BASE = 'https://www.cheapshark.com/api/1.0';

  async getAllGames() {
    const response = await fetch(`${this.BASE_URL}/games?key=${this.API_KEY}&metacritic=1,100&search=&page=1&page_size=40`);
    const data = await response.json();
    const games = data.results;
    return games;
  }

  // Get top 15 games with high metacritic scores - randomized
  async getTopGames() {
    const response = await fetch(`${this.BASE_URL}/games?key=${this.API_KEY}&metacritic=80,100&ordering=-metacritic,-rating&page_size=50`);
    const data = await response.json();
    const allTopGames = data.results;
    
    // Shuffle and take 15 random games
    const shuffled = allTopGames.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15);
  }

  async getCurrentPaginationPage(search: string, currentPagination: number) {
    const response = await fetch(`${this.BASE_URL}/games?key=${this.API_KEY}&search=${search}&search_exact&page=${currentPagination}&page_size=40`);
    const data = await response.json();
    return data.results;
  }

  async getCarousel(gameID: number) {
    const respone = await fetch(`${this.BASE_URL}/games/${gameID}?key=${this.API_KEY}`);
  }

  async getDescription(gameID: number) {
    const response = await fetch(`${this.BASE_URL}/games/${gameID}?key=b160d72957cf445c89d4bd750faeba94`);
    const data = await response.json();
    return data;
  }

  async getDeals(game: string) {
    const gameDeals = game
                .replace(/ /g, "%20")
                .replace(/:/g, "")
                .replace(/ä/g, "")
                .replace(/ö/g, "")
                .replace(/ü/g, "")
                .replace(/\s*\([^)]*\)/g, "");
    const response = await fetch(`${this.CHEAPSHARK_URL_BASE}/games?title=${gameDeals}&exact=1`)
    const data = await response.json();
    const gameCheap = data[0];
    const deals = await fetch(`${this.CHEAPSHARK_URL_BASE}/games?id=${gameCheap.gameID}`);
    const dealsData = await deals.json();
    return dealsData;
  }

  async getReviews(page: number, gameID: number) {
    const response = await fetch(`${this.BASE_URL}/games/${gameID}/reviews?key=${this.API_KEY}&ordering=-rating&page=${page}&page_size=3`);
    const data = await response.json();
    const review = data;
    return review;
  }
  
  async getToReview(page: number, gameID: number) {
    const response = await fetch(`${this.BASE_URL}/games/${gameID}/reviews?key=${this.API_KEY}&ordering=-rating&page=${page}&page_size=3`);
    const data = await response.json();
    const review = data;
    return review;
  }

  async getAllStores() {
    const response = await fetch(`${this.CHEAPSHARK_URL_BASE}/stores`);
    const data = await response.json();
    const stores = data;
    return stores;
  }
}