import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { BookableSpacesService } from './services/bookable-spaces.service';
import { BookingsUtilsService } from './services/bookings-utils.service';
import { BookingsService } from './services/bookings.service';
import { BookingNewModalPage } from './views/booking-new-modal/booking-new.modal';
import { BookingViewModalPage } from './views/booking-view-modal/booking-view.modal';
import { BookingsPage } from './views/bookings/bookings.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: BookingsPage }]),
  ],
  providers: [BookingsService, BookableSpacesService, BookingsUtilsService],
  declarations: [BookingsPage, BookingNewModalPage, BookingViewModalPage],
})
export class BookignsModule {}
