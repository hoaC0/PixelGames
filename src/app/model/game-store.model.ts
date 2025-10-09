export type Game = {
  id: number;
  name: string;
  slug: string;
  background_image?: string;
  description_raw?: string;
  short_screenshots?: { id: number; image: string }[];
  rating?: number;
  metacritic?: number;
  released?: string;
}