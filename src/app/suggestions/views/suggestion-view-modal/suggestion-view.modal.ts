import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Suggestion } from '../../classes/suggestion.class';

@Component({
  selector: 'app-suggestion-view',
  templateUrl: 'suggestion-view.modal.html',
  styleUrls: ['suggestion-view.modal.scss'],
})
export class SuggestionViewModalPage {
  @Input() entityParam: Suggestion;
  constructor(private modalController: ModalController) {}

  protected closeModal() {
    this.modalController.dismiss();
  }
}
