import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { BoardGamesService } from './board-games.service';
import { BGCategoryModalPage } from './views/bg-category-modal/bg-category-modal.modal';
import { BoardGameModalPage } from './views/board-game/board-game.modal';
import { BoardGamesPage } from './views/board-games/board-games.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: BoardGamesPage }]),
  ],
  providers: [BoardGamesService],
  declarations: [BoardGamesPage, BoardGameModalPage, BGCategoryModalPage],
})
export class BoardGamesModule {}
