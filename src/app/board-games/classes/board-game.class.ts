import { BGCategory } from './bg-category.class';

export class BoardGame {
  id: string;
  title: string;
  introduction: string;
  description: string;
  coverArtImage?: string;
  minPlayers: number;
  maxPlayers: number;
  averageLength: number;
  minAge: number;
  unitsAvaliable: number;
  categories?: BGCategory[];
}
