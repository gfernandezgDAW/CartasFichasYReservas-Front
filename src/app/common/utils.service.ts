import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export const MOBILE_MAX_WIDTH = 768;

@Injectable()
export class UtilsService {
  constructor(private toastController: ToastController) {}

  async displayToast(msg: string, type: 'error' | 'info') {
    const toast = await this.toastController.create({
      header: `${type === 'error' ? 'Error: ' : ''}${msg.toString().trim()}`,
      duration: 2000,
      color: type === 'error' ? 'danger' : 'primary',
    });

    await toast.present();
  }

  deviceIsMobile() {
    return window.innerWidth <= MOBILE_MAX_WIDTH;
  }
}
