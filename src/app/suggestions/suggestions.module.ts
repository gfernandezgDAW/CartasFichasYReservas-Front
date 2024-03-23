import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';
import { SuggestionsService } from './suggestions.service';
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
  declarations: [SuggestionsPage],
})
export class SuggestionsModule {}
