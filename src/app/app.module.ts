import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { register } from 'swiper/element/bundle';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BoardGamesModule } from './board-games/board-games.module';
import { BookignsModule } from './bookings/bookings.module';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';
import { GenericNetworkErrorInterceptor } from './common/interceptors/error.interceptor';
import { JwtInterceptor } from './common/interceptors/jwt.interceptor';
import { DateUtilsService } from './common/services/date-utils.service';
import { UtilsService } from './common/services/utils.service';
import { SharedModule } from './common/shared.module';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { HomeModule } from './home/home.module';
import { TabsModule } from './shared-modules/ui/tabs/tabs.module';
import { SuggestionsModule } from './suggestions/suggestions.module';

register();

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    AuthModule,
    TabsModule,
    HomeModule,
    BoardGamesModule,
    BookignsModule,
    SuggestionsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UtilsService,
    DateUtilsService,
    IsAuthenticatedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GenericNetworkErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    dayjs.locale('es');
  }
}
