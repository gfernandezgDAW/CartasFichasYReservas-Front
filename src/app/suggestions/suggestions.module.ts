import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';
import { SuggestionsService } from './suggestions.service';
import { SuggestionNewModalModalPage } from './views/suggestion-new-modal/suggestion-new.modal';
import { SuggestionViewModalPage } from './views/suggestion-view-modal/suggestion-view.modal';
import { SuggestionsPage } from './views/suggestions/suggestions.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SuggestionsPage,
      },
    ]),
  ],
  providers: [SuggestionsService],
  declarations: [
    SuggestionsPage,
    SuggestionNewModalModalPage,
    SuggestionViewModalPage,
  ],
})
export class SuggestionsModule {}
