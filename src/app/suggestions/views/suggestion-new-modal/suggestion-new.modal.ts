import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { first } from 'rxjs';
import {
  UtilsService,
  fieldIsNotEmpty,
} from '../../../common/services/utils.service';
import { SuggestionsService } from '../../suggestions.service';

@Component({
  selector: 'app-suggestion-new',
  templateUrl: 'suggestion-new.modal.html',
  styleUrls: ['suggestion-new.modal.scss'],
})
export class SuggestionNewModalModalPage {
  suggestionForm = this.formBuilder.group({
    title: ['', [Validators.required, fieldIsNotEmpty]],
    description: ['', [Validators.required, fieldIsNotEmpty]],
  });

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private suggestionService: SuggestionsService,
    private utilsService: UtilsService
  ) {}

  protected closeModal(refreshSuggestions = false) {
    this.modalController.dismiss({ refreshSuggestions });
  }

  newSuggestionSubmit() {
    const formControls = this.suggestionForm.controls;
    const title = formControls.title.value;
    const description = formControls.description.value;

    if (!title || !description) {
      return;
    }

    this.suggestionService
      .postNewSuggestion(title.trim(), description.trim())
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast('Sugerencia creada con exito', 'info');
        this.closeModal(true);
      });
  }
}
