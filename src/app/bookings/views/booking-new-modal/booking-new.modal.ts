import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import dayjs from 'dayjs';
import { first } from 'rxjs';

import { BoardGame } from '../../../board-games/classes/board-game.class';
import { BoardGameModalPage } from '../../../board-games/views/board-game-modal/board-game.modal';
import { DateUtilsService } from '../../../common/services/date-utils.service';
import { UtilsService } from '../../../common/services/utils.service';
import {
  BookableSpace,
  BookableSpaceStatus,
} from '../../classes/bookable-space.class';
import { BookableSpacesService } from '../../services/bookable-spaces.service';
import { BookingsUtilsService } from '../../services/bookings-utils.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-booking-new',
  templateUrl: 'booking-new.modal.html',
  styleUrls: ['booking-new.modal.scss'],
})
export class BookingNewModalPage {
  oppenedAccordion = '1';
  currentForm = 1;
  minTimeStartOf = '08:00';
  maxTimeStartOf = '21:00';
  minTimeEndOf = '08:30';
  maxTimeEndOf = '21:30';
  minuteValues = '0,5,10,15,20,25,30,35,40,45,50,55';
  spaceCapacity = Array.from({ length: 8 }, (_, i) => i + 1);
  availableBookableSpaces: BookableSpace[] = [];
  availableBoardGames: BoardGame[] = [];
  allBookableSpaces: BookableSpace[] = [];
  currentScreenWidth = 0;

  date = new Date().toISOString();
  startOf = this.dateUtilsService
    .daysJsUtc()
    .startOf('d')
    .set('hour', 8)
    .toJSON();
  endOf = this.dateUtilsService
    .daysJsUtc()
    .startOf('d')
    .set('hour', 8)
    .set('minute', 30)
    .toDate()
    .toJSON();
  datesForm = this.formBuilder.group({
    date: [this.date, [Validators.required]],
    startOf: [this.startOf, [Validators.required]],
    endOf: [this.endOf, [Validators.required]],
  });
  bookableSpaceForm = this.formBuilder.group({
    participants: [null, [Validators.required]],
    bookableSpace: [null || new BookableSpace(), [Validators.required]],
  });
  boardGameForm = this.formBuilder.group({
    boardGame: [null || new BoardGame(), [Validators.required]],
  });

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private dateUtilsService: DateUtilsService,
    private bookingsService: BookingsService,
    private utilsService: UtilsService,
    private bookableSpacesService: BookableSpacesService,
    protected bookingsUtilsService: BookingsUtilsService
  ) {
    this.setMinMaxTimeValues();
    this.getScreenSize();
  }

  setMinMaxTimeValues() {
    this.minTimeStartOf = this.dateUtilsService
      .daysJsUtc(this.date)
      .startOf('d')
      .set('hour', 8)
      .toISOString();
    this.maxTimeStartOf = this.dateUtilsService
      .daysJsUtc(this.date)
      .startOf('d')
      .set('hour', 21)
      .toISOString();
    this.minTimeEndOf = this.dateUtilsService
      .daysJsUtc(this.minTimeStartOf)
      .add(30, 'minute')
      .toISOString();
    this.maxTimeEndOf = this.dateUtilsService
      .daysJsUtc(this.maxTimeStartOf)
      .add(30, 'minute')
      .toISOString();
  }

  @HostListener('window:resize')
  getScreenSize() {
    this.currentScreenWidth = window.innerWidth;
  }

  changeCurrentForm(formNumber: number) {
    this.currentForm = formNumber;
    this.oppenedAccordion = this.currentForm.toString();
    this.loadDataFromCurrentForm();
  }

  loadDataFromCurrentForm() {
    switch (this.currentForm) {
      case 1: {
        this.bookableSpaceForm.controls.participants.patchValue(null);
        this.bookableSpaceForm.controls.bookableSpace.patchValue(null);
        this.availableBookableSpaces = [];
        break;
      }
      case 2: {
        this.boardGameForm.controls.boardGame.patchValue(null);
        this.availableBoardGames = [];
        break;
      }
      case 3: {
        const { startOf, endOf } = this.getFormatedStartOfAndEndOf();
        this.getAvailableBoardGames(startOf, endOf);
        break;
      }
    }
  }

  getAvailableBookingSpaceBetweenDates(
    from: Date,
    to: Date,
    participants: number
  ) {
    this.bookingsService
      .getAvailableBookingSpaceBetweenDates(from, to, participants)
      .pipe(first())
      .subscribe((res) => {
        this.availableBookableSpaces = res;
        this.getAllBookingSpaces();
      });
  }

  getAvailableBoardGames(from: Date, to: Date) {
    this.bookingsService
      .getAvailableBoardGamesBetweenDates(from, to)
      .pipe(first())
      .subscribe((res) => {
        this.availableBoardGames = res;
      });
  }

  getAllBookingSpaces() {
    this.bookableSpacesService
      .getAllBookableSpaces()
      .pipe(first())
      .subscribe((res) => {
        this.allBookableSpaces = res;
        this.loadAllBookingSpacesStatus();
      });
  }

  loadAllBookingSpacesStatus() {
    for (let [index, bookableSpace] of this.allBookableSpaces.entries()) {
      if (
        this.availableBookableSpaces.find(
          (availabelBookableSpace) =>
            availabelBookableSpace.id === bookableSpace.id
        )
      ) {
        this.allBookableSpaces[index].status = 'libre';
        continue;
      }

      this.allBookableSpaces[index].status = 'ocupado';
    }
  }

  protected closeModal(refreshBookings = false) {
    this.modalController.dismiss({ refreshBookings });
  }

  updateDateInput(date: Date, inputValueName: 'startOf' | 'endOf') {
    this[inputValueName] = this.dateUtilsService.daysJsUtc(date).toISOString();

    if (inputValueName !== 'startOf') {
      return;
    }

    const updatedTime = this.dateUtilsService
      .daysJsUtc(this[inputValueName])
      .add(30, 'minute')
      .toISOString();
    this.minTimeEndOf = updatedTime;

    if (new Date(this.endOf).getTime() >= new Date(updatedTime).getTime()) {
      return;
    }

    this.endOf = updatedTime;
    this.datesForm.patchValue({ endOf: updatedTime });
  }

  showDatesFormDetail() {
    if (this.currentForm === 1) {
      return '';
    }

    const datesFormValue = this.datesForm.value;
    return `: ${this.dateUtilsService.toFullDateFormat(
      datesFormValue.date
    )} - De ${this.dateUtilsService.toHHmmFormat(
      datesFormValue.startOf
    )} a ${this.dateUtilsService.toHHmmFormat(datesFormValue.endOf)}`;
  }

  showBookableSpaceFormDetail() {
    if (
      this.currentForm <= 2 ||
      !this.bookableSpaceForm?.value?.bookableSpace
    ) {
      return '';
    }

    return `: ${this.showBookableSpaceDetail(
      this.bookableSpaceForm.value.bookableSpace
    )}`;
  }

  showBookableSpaceDetail(
    bookableSpace: BookableSpace,
    displaySelectedParticipants = true,
    displayStatus = false
  ) {
    const participants = this.bookableSpaceForm.value.participants;
    if (!participants) {
      return;
    }

    return `Sitio: ${bookableSpace.spaceNumber} - Capacidad: ${
      bookableSpace.capacity
    }${
      displaySelectedParticipants
        ? ` - Nº de Participantes: ${participants}`
        : ''
    }${
      displayStatus && bookableSpace.status
        ? ` - Estado: ${this.displayBookableSpaceStatus(bookableSpace.status)}`
        : ''
    }`;
  }

  displayBookableSpaceStatus(status: BookableSpaceStatus) {
    const text = `${status}${
      status === 'ocupado' ? ' y/o sin suficiente capacidad' : ''
    }`;

    return ` - Estado: ${this.utilsService.stringToTitleCase(text)}`;
  }

  showBoardGameFormDetail() {
    if (this.currentForm <= 3 || !this.boardGameForm?.value?.boardGame) {
      return '';
    }

    const boardGame = this.boardGameForm.value.boardGame as BoardGame;
    return `: ${boardGame.title}`;
  }

  async openGameDetailModal() {
    if (!this.boardGameForm?.value?.boardGame) {
      return;
    }

    await this.utilsService.openModal(
      BoardGameModalPage,
      this.modalController,
      this.boardGameForm.value.boardGame as BoardGame
    );
  }

  confirmBooking() {
    const bookableSpaceFormValue = this.bookableSpaceForm.value;
    const bookableSpace = bookableSpaceFormValue.bookableSpace;
    const participants = bookableSpaceFormValue.participants;
    const boardGame = this.boardGameForm.value.boardGame;
    if (!bookableSpace || !boardGame || !participants) {
      return;
    }

    const { startOf, endOf } = this.getFormatedStartOfAndEndOf();
    this.bookingsService
      .postNewBooking(startOf, endOf, bookableSpace, boardGame, participants)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast('Reserva creada con exito', 'info');
        this.closeModal(true);
      });
  }

  private getFormatedStartOfAndEndOf() {
    const dateFormControls = this.datesForm.controls;
    const selectedDate = dayjs(dateFormControls.date.value).get('date');
    const startOf = dayjs(this.datesForm.controls.startOf.value)
      .set('date', selectedDate)
      .toDate();
    const endOf = dayjs(this.datesForm.controls.endOf.value)
      .set('date', selectedDate)
      .toDate();
    return { startOf, endOf };
  }

  onChangeParticipantsNumber(event: CustomEvent) {
    const participants = event.detail.value;
    this.availableBookableSpaces = [];
    this.bookableSpaceForm.controls.bookableSpace.patchValue(null);
    const { startOf, endOf } = this.getFormatedStartOfAndEndOf();
    this.getAvailableBookingSpaceBetweenDates(startOf, endOf, participants);
  }

  getBookableSpaceImageColorClass(status: BookableSpaceStatus) {
    if (!status) {
      return '';
    }

    return `booking-new__accordion__content__form__map__img-float__${status}`;
  }

  onBookableSpaceMapClicked(
    bookableSpace: BookableSpace,
    selectedIndex: number
  ) {
    switch (bookableSpace.status) {
      case 'ocupado':
        this.utilsService.displayToast(
          'Este espacio ya se encuentra ocupado dentro del horario seleccionado y/o no tiene la capacidad suficiente',
          'error'
        );
        break;
      case 'libre':
        this.onBookableSpaceMapSelectedIsLibre(bookableSpace, selectedIndex);
        break;
      default:
        break;
    }
  }

  onBookableSpaceMapSelectedIsLibre(
    bookableSpace: BookableSpace,
    selectedIndex: number,
    isFromSelector = false
  ) {
    const indexOfPreviouslySelected = this.allBookableSpaces.findIndex(
      (currentBookableSpace) => currentBookableSpace.status === 'seleccionado'
    );
    if (indexOfPreviouslySelected !== -1) {
      this.allBookableSpaces[indexOfPreviouslySelected].status = 'libre';
    }

    this.allBookableSpaces[selectedIndex].status = 'seleccionado';
    if (isFromSelector) {
      return;
    }

    const currentAvailableBookableSpace = this.availableBookableSpaces.find(
      (currentAvailableBookableSpace) =>
        currentAvailableBookableSpace.id === bookableSpace.id
    );
    if (!currentAvailableBookableSpace) {
      return;
    }

    this.bookableSpaceForm.controls.bookableSpace.patchValue(
      currentAvailableBookableSpace
    );
    this.utilsService.displayToast('Sitio seleccionado', 'info');
  }

  onBookableSpaceSelectedInSelector(event: CustomEvent) {
    const selectedSpace = event.detail.value;
    const indexOfSpaceInMap = this.allBookableSpaces.findIndex(
      (bookableSpace) => bookableSpace.id === selectedSpace.id
    );

    this.onBookableSpaceMapSelectedIsLibre(
      this.allBookableSpaces[indexOfSpaceInMap],
      indexOfSpaceInMap,
      true
    );
  }

  displayMapChecks() {
    return (
      this.availableBookableSpaces.length &&
      this.allBookableSpaces.length &&
      this.bookingsUtilsService.mapHasMinimunScreenWidthRequirement(
        this.currentScreenWidth
      )
    );
  }
}
