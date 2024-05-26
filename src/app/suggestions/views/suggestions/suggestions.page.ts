import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs';

import { DateUtilsService } from '../../../common/services/date-utils.service';
import { UtilsService } from '../../../common/services/utils.service';
import { Suggestion } from '../../classes/suggestion.class';
import { SuggestionsService } from '../../suggestions.service';
import { SuggestionNewModalModalPage } from '../suggestion-new-modal/suggestion-new.modal';
import { SuggestionViewModalPage } from '../suggestion-view-modal/suggestion-view.modal';

@Component({
  selector: 'app-suggestions',
  templateUrl: 'suggestions.page.html',
  styleUrls: ['suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {
  suggestions: Suggestion[] = [];

  constructor(
    private suggestionsService: SuggestionsService,
    private modalController: ModalController,
    private utilsService: UtilsService,
    private dateUtilsService: DateUtilsService
  ) {}

  ngOnInit() {
    this.getAllUserSuggestions();
  }

  getAllUserSuggestions() {
    this.suggestionsService
      .getAllUserSuggestions()
      .pipe(first())
      .subscribe((res) => {
        this.suggestions = res;
      });
  }

  getSuggestionTitle(suggestion: Suggestion) {
    return `${this.dateUtilsService.toFullDateFormat(suggestion.createdAt)} - ${
      suggestion.title
    }`;
  }

  async openSuggestionNewModal() {
    await this.utilsService
      .openModal(SuggestionNewModalModalPage, this.modalController)
      .then((res) => {
        this.refreshSuggestionsOnCloseModal(res);
      });
  }

  refreshSuggestionsOnCloseModal(res: any) {
    if (res.data && res.data.refreshSuggestions) {
      this.getAllUserSuggestions();
    }
  }

  async openSuggestionViewModal(suggestion: Suggestion) {
    await this.utilsService.openModal(
      SuggestionViewModalPage,
      this.modalController,
      suggestion
    );
  }
}
