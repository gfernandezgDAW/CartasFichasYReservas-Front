import { Component, HostListener, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private utilsService: UtilsService, private router: Router) {
    this.deviceIsMobile();
    const loggedAsStorage = localStorage.getItem('cfyrLoggedAs');
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

  logOff() {
    localStorage.removeItem('cfyrToken');
    localStorage.removeItem('cfyrLoggedAs');
    this.router.navigate(['']);
  }
}
