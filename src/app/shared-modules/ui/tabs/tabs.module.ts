import { NgModule } from '@angular/core';
import { TabsPage } from './views/tabs.page';

import { SharedModule } from '../../../common/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [TabsPage],
})
export class TabsModule {}
