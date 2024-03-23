import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BoardGamesModule } from './board-games/board-games.module';
import { BookignsModule } from './bookings/bookings.module';
import { SharedModule } from './common/shared.module';
import { UtilsService } from './common/utils.service';
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
    IsAuthenticatedGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
