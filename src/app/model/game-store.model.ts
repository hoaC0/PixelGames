export type Game = {
    id: string;
    title: string;
    steamRatingText?: string;
    steamRatingPercent?: number;
    normalPrice: string;
    dealRating?: string;
    external?: string;
    thumb?: string;
}