import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BGCategory } from '../../classes/bg-category.class';

@Component({
  selector: 'app-bg-category',
  templateUrl: 'bg-category-modal.modal.html',
  styleUrls: ['bg-category-modal.modal.scss'],
})
export class BGCategoryModalPage {
  @Input() entityParam: BGCategory;
  constructor(private modalController: ModalController) {}

  protected closeModal() {
    this.modalController.dismiss();
  }
}
