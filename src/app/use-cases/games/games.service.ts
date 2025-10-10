import { Injectable } from '@angular/core';

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
    const response = await fetch(`${this.BASE_URL}/games?key=${this.API_KEY}&metacritic=1,100&search=&page=
      1
      &page_size=40`); // instead if one currentPagination
    const data = await response.json();
    console.log("servce", data)
    const games = data.results;
    return games;
  }

  async getCurrentPaginationPage(search: string, currentPagination: number) {
    const response = await fetch(`${this.BASE_URL}/games?key=${this.API_KEY}&search=${search}&search_exact&page=${currentPagination}&page_size=40`);
    const data = await response.json();
    return data.results;
  }

  async getDescription(gameID: number) {
    const response = await fetch(`${this.BASE_URL}/games/${gameID}?key=b160d72957cf445c89d4bd750faeba94`); // TODO: &metacritic=1,100 
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

  async getReviews() {

  }

  async getAllStores() {
    const response = await fetch(`${this.CHEAPSHARK_URL_BASE}/stores`);
    const data = await response.json();
    const stores = data;
    return stores;
  }


}
