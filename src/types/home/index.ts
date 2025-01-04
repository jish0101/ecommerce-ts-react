import { Product } from '../product';

export type BestDeal = {
  _id: string;
  categoryName: string;
  products: Partial<Product[]>;
};

export type HeroCarousel = {
  _id: string;
  imageLinks: string[];
};

export type HomePage = {
  bestDeals: BestDeal[];
  heroCarousel: HeroCarousel[];
};
