import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService } from '../common/utils.service';

@Injectable()
export class AuthUtilsService {
  constructor(private utilsService: UtilsService, private router: Router) {}

  logOff(displayToast = true) {
    localStorage.removeItem('cfyrAppToken');
    localStorage.removeItem('cfyrAppLoggedAs');
    this.router.navigate(['']);
    if (!displayToast) {
      return;
    }

    this.utilsService.displayToast('Se cerro la sesión actual', 'info');
  }
}
