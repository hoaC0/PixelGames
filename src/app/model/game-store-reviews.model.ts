export interface Reviews {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserReview[];
}

export interface UserReview {
  user: User;
  text: string;
  rating: number;
  created: string;
}

export interface User {
    avatar: string | null;
    username: string;
}