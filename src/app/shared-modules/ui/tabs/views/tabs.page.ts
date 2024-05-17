import { Component, HostListener, Injectable } from '@angular/core';

import { UtilsService } from '../../../../common/services/utils.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
@Injectable()
export class TabsPage {
  isMobile = false;
  constructor(private utilsService: UtilsService) {
    this.deviceIsMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.deviceIsMobile();
  }

  deviceIsMobile() {
    this.isMobile = this.utilsService.deviceIsMobile();
  }
}
