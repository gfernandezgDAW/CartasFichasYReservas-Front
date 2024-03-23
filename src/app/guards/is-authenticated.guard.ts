import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UtilsService } from '../common/utils.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private utilsService: UtilsService) {}

  canActivate() {
    const tokenStorage = localStorage.getItem('cfyrToken');
    if (!tokenStorage) {
      this.utilsService.displayToast('Debes iniciar sesión', 'error');
      this.router.navigate(['']);
      return false;
    }

    const token: Token = JSON.parse(tokenStorage);
    return !!token;
  }
}
