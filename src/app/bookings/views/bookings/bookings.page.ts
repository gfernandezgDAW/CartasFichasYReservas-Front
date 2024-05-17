import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs';

import { DateUtilsService } from '../../../common/services/date-utils.service';
import { UtilsService } from '../../../common/services/utils.service';
import { Booking } from '../../classes/booking.class';
import { BookingsService } from '../../services/bookings.service';
import { BookingNewModalPage } from '../booking-new-modal/booking-new.modal';
import { BookingViewModalPage } from '../booking-view-modal/booking-view.modal';

@Component({
  selector: 'app-bookings',
  templateUrl: 'bookings.page.html',
  styleUrls: ['bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[] = [];

  constructor(
    private bookingsService: BookingsService,
    private utilsService: UtilsService,
    private modalController: ModalController,
    private dateUtilsService: DateUtilsService
  ) {}

  ngOnInit() {
    this.getAllUserBookings();
  }

  getAllUserBookings() {
    this.bookingsService
      .getAllUserBookings()
      .pipe(first())
      .subscribe((res) => {
        this.bookings = res.sort(
          (bookingA, bookingB) =>
            new Date(bookingB.startOf).getTime() -
            new Date(bookingA.startOf).getTime()
        );
      });
  }

  async openBookingNewModal() {
    await this.utilsService
      .openModal(
        BookingNewModalPage,
        this.modalController,
        undefined,
        'modal-autoheight-extended-width'
      )
      .then((res) => {
        this.refreshBookingsOnCloseModal(res);
      });
  }

  async openBookingViewModal(booking: Booking) {
    await this.utilsService
      .openModal(
        BookingViewModalPage,
        this.modalController,
        booking,
        'modal-autoheight-extended-width'
      )
      .then((res) => {
        this.refreshBookingsOnCloseModal(res);
      });
  }

  refreshBookingsOnCloseModal(res: any) {
    if (res.data && res.data.refreshBookings) {
      this.getAllUserBookings();
    }
  }

  getBookingTime(booking: Booking) {
    const dayjsUtcStartOf = this.dateUtilsService.daysJsUtc(booking.startOf);
    return `${dayjsUtcStartOf.format(
      'DD/MM/YYYY'
    )} - De ${dayjsUtcStartOf.format('HH:mm')} a ${this.dateUtilsService
      .daysJsUtc(booking.endOf)
      .format('HH:mm')}`;
  }
}
