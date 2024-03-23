import { Component, HostListener, Injectable, Input } from '@angular/core';

import { UtilsService } from '../../../common/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@Injectable()
export class HeaderComponent {
  @Input() title: string;
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
