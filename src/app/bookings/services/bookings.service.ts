import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { BoardGame } from '../../board-games/classes/board-game.class';

import { BookableSpace } from '../classes/bookable-space.class';
import { Booking } from '../classes/booking.class';

@Injectable()
export class BookingsService {
  bookingsUrl = `${environment.apiUrl}booking`;
  constructor(private http: HttpClient) {}

  getAllUserBookings() {
    return this.http.get<Booking[]>(`${this.bookingsUrl}/all/app`);
  }

  postNewBooking(
    startOf: Date,
    endOf: Date,
    bookableSpace: BookableSpace,
    boardGame: BoardGame,
    participants: number
  ) {
    return this.http.post<Booking>(`${this.bookingsUrl}/new/app`, {
      startOf,
      endOf,
      bookableSpace,
      boardGame,
      participants,
    });
  }

  getAvailableBookingSpaceBetweenDates(
    from: Date,
    to: Date,
    participants: number
  ) {
    return this.http.post<BookableSpace[]>(
      `${this.bookingsUrl}/available-spaces`,
      { from, to, participants }
    );
  }

  getAvailableBoardGamesBetweenDates(from: Date, to: Date) {
    return this.http.post<BoardGame[]>(`${this.bookingsUrl}/available-games`, {
      from,
      to,
    });
  }

  cancelBooking(bookingId: string) {
    return this.http.post<Booking>(`${this.bookingsUrl}/cancel`, {
      bookingId,
    });
  }
}
