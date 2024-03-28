import { Component, HostListener, Injectable, Input } from '@angular/core';

import { AuthUtilsService } from '../../../auth/auth-utils.service';
import { UtilsService } from '../../../common/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
@Injectable()
export class ProfileComponent {
  @Input() title: string;
  email = '';
  isMobile = false;
  constructor(
    private utilsService: UtilsService,
    public authUtilsService: AuthUtilsService
  ) {
    this.deviceIsMobile();
    const loggedAsStorage = localStorage.getItem('cfyrAppLoggedAs');
    if (!loggedAsStorage) {
      return;
    }

    this.email = loggedAsStorage;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.deviceIsMobile();
  }

  deviceIsMobile() {
    this.isMobile = this.utilsService.deviceIsMobile();
  }
}
