import { BoardGame } from '../../board-games/classes/board-game.class';

import { BookableSpace } from './bookable-space.class';

export class Booking {
  id: string;
  startOf: Date;
  endOf: Date;
  participants: number;
  bookableSpace: BookableSpace;
  boardGame: BoardGame;
  status: 'Pendiente' | 'Activa' | 'Finalizada' | 'Cancelada';
}
