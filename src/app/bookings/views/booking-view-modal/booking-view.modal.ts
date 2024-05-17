import { Component, HostListener, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { first } from 'rxjs';
import { BoardGameModalPage } from '../../../board-games/views/board-game-modal/board-game.modal';
import { DateUtilsService } from '../../../common/services/date-utils.service';
import { UtilsService } from '../../../common/services/utils.service';
import { BookableSpace } from '../../classes/bookable-space.class';
import { Booking } from '../../classes/booking.class';
import { BookableSpacesService } from '../../services/bookable-spaces.service';
import { BookingsUtilsService } from '../../services/bookings-utils.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-booking-view',
  templateUrl: 'booking-view.modal.html',
  styleUrls: ['booking-view.modal.scss'],
})
export class BookingViewModalPage {
  @Input() entityParam: Booking;
  currentScreenWidth = 0;
  allBookableSpaces: BookableSpace[] = [];
  constructor(
    private modalController: ModalController,
    private dateUtilsService: DateUtilsService,
    private utilsService: UtilsService,
    protected bookingsUtilsService: BookingsUtilsService,
    private bookableSpacesService: BookableSpacesService,
    private bookingService: BookingsService
  ) {
    this.getScreenSize();
    this.getAllBookingSpaces();
  }

  @HostListener('window:resize')
  getScreenSize() {
    this.currentScreenWidth = window.innerWidth;
  }

  protected closeModal(refreshBookings = false) {
    this.modalController.dismiss({ refreshBookings });
  }

  getAllBookingSpaces() {
    this.bookableSpacesService
      .getAllBookableSpaces()
      .pipe(first())
      .subscribe((res) => {
        this.allBookableSpaces = res;
        this.loadSelectedBookingSpaceStatus();
      });
  }

  loadSelectedBookingSpaceStatus() {
    const indexOf = this.allBookableSpaces.findIndex(
      (bookableSpace) => bookableSpace.id === this.entityParam.bookableSpace.id
    );

    this.allBookableSpaces[indexOf].status = 'seleccionado';
  }

  showBookingDates() {
    const startOf = this.entityParam.startOf;
    return `${this.dateUtilsService.toFullDateFormat(
      startOf
    )} - De ${this.dateUtilsService.toHHmmFormat(
      startOf
    )} a ${this.dateUtilsService.toHHmmFormat(this.entityParam.endOf)}`;
  }

  showBookingBookablePlaceDetail() {
    const bookableSpace = this.entityParam.bookableSpace;
    return `${this.showBookableSpaceDetail(
      bookableSpace
    )} - Nº de Participantes: ${this.entityParam.participants}`;
  }

  async openGameDetailModal() {
    await this.utilsService.openModal(
      BoardGameModalPage,
      this.modalController,
      this.entityParam.boardGame
    );
  }

  displayMapChecks() {
    return (
      this.allBookableSpaces.length &&
      this.bookingsUtilsService.mapHasMinimunScreenWidthRequirement(
        this.currentScreenWidth
      )
    );
  }

  showBookableSpaceDetail(bookableSpace: BookableSpace, displayStatus = false) {
    return `Sitio: ${bookableSpace.spaceNumber} - Capacidad: ${
      bookableSpace.capacity
    }${
      displayStatus && bookableSpace?.status === 'seleccionado'
        ? ` - Tu sitio`
        : ''
    }`;
  }

  cancelBooking() {
    this.bookingService
      .cancelBooking(this.entityParam.id)
      .pipe(first())
      .subscribe((_) => {
        this.utilsService.displayToast('Reserva cancelada con exito', 'info');
        this.closeModal(true);
      });
  }

  displayCancelBookingBtn() {
    if (!this.entityParam) {
      return false;
    }

    const bookingStatus = this.entityParam.status;
    return bookingStatus !== 'Cancelada' && bookingStatus !== 'Finalizada';
  }
}
