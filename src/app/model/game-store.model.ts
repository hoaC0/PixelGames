export type Game = {
    id: string;
    title: string;
    steamRatingText?: string;
    steamRatingPercent?: number;
    steamAppID?: string;
    normalPrice: string;
    dealRating?: string;
    external?: string;
    thumb?: string;
}