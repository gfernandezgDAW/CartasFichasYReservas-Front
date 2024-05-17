export type BookableSpaceStatus = 'seleccionado' | 'ocupado' | 'libre';

export class BookableSpace {
  id: string;
  spaceNumber: number;
  left: number;
  top: number;
  size: number;
  capacity: number;
  status: BookableSpaceStatus;
}
