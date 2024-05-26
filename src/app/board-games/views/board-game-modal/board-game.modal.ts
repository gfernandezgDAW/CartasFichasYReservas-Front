import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UtilsService } from '../../../common/services/utils.service';
import { BGCategory } from '../../classes/bg-category.class';
import { BoardGame } from '../../classes/board-game.class';
import { BGCategoryModalPage } from '../bg-category-modal/bg-category.modal';

@Component({
  selector: 'app-board-game',
  templateUrl: 'board-game.modal.html',
  styleUrls: ['board-game.modal.scss'],
})
export class BoardGameModalPage {
  @Input() entityParam: BoardGame;
  constructor(
    private modalController: ModalController,
    protected utilsService: UtilsService
  ) {}

  protected closeModal() {
    this.modalController.dismiss();
  }

  async openBGCategoryDetailModal(bgCategory: BGCategory) {
    await this.utilsService.openModal(
      BGCategoryModalPage,
      this.modalController,
      bgCategory
    );
  }

  getPlayerNumbersDataString() {
    const minP = this.entityParam.minPlayers;
    const maxP = this.entityParam.maxPlayers;
    return maxP === minP ? minP : `${minP} a ${maxP}`;
  }
}
