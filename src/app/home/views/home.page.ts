import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email = '';
  constructor() {
    const loggedAsStorage = localStorage.getItem('cfyrAppLoggedAs');
    if (!loggedAsStorage) {
      return;
    }

    this.email = loggedAsStorage;
  }

  getWelcomeTitle() {
    return `¡Bienvenido${
      this.email && this.email.length ? ' ' + this.email : ''
    }!`;
  }
}
