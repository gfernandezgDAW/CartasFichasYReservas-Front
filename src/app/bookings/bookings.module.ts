import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { BookingsService } from './bookings.service';
import { BookingsPage } from './views/bookings/bookings.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: BookingsPage }]),
  ],
  providers: [BookingsService],
  declarations: [BookingsPage],
})
export class BookignsModule {}
