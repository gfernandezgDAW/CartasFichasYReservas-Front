import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

import { environment } from '../../../environments/environment';

export const MOBILE_MAX_WIDTH = 768;

export function fieldIsNotEmpty(control: AbstractControl) {
  const trimmedValue = control.value.trim();
  if (trimmedValue.length) {
    return null;
  }

  return { fieldIsNotEmpty: false };
}

@Injectable()
export class UtilsService {
  constructor(
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

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

  getCompleteImageUrl(imgName: string | undefined) {
    if (!imgName) {
      return this.getNoImageFoundUrl();
    }

    return `${environment.apiUrl}/${imgName}`;
  }

  getNoImageFoundUrl() {
    return '../../assets/no-image.svg';
  }

  noImageFoundEvent(e: Event) {
    const target = e.target as HTMLInputElement;
    target.src = this.getNoImageFoundUrl();
  }

  orderArrayByProperty(array: any[], property: string, order: 'ASC' | 'DESC') {
    if (order === 'ASC') {
      return array.sort((elementA, elementB) =>
        elementA[property]
          .toString()
          .localeCompare(elementB[property].toString())
      );
    }

    return array.sort((elementA, elementB) =>
      elementB[property].toString().localeCompare(elementA[property].toString())
    );
  }

  async openModal(
    componentRef: any,
    modalController: ModalController,
    entityParam?: any,
    customCssClass = 'modal-autoheight'
  ) {
    const modal = await modalController.create({
      component: componentRef,
      animated: true,
      componentProps: { entityParam },
      cssClass: customCssClass,
    });

    await modal.present();
    return await modal.onDidDismiss();
  }

  async closeAllActiveModals() {
    const currentTopModal = await this.modalController.getTop();
    if (!currentTopModal) {
      return;
    }

    this.recursivelyCloseAllActiveModals(currentTopModal);
  }

  private recursivelyCloseAllActiveModals(topModal: HTMLIonModalElement) {
    return new Promise((resolve) => {
      topModal.dismiss().then(async () => {
        const currentTopModal = await this.modalController.getTop();
        resolve(
          currentTopModal
            ? this.recursivelyCloseAllActiveModals(currentTopModal)
            : true
        );
      });
    });
  }

  stringToTitleCase(string: string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
}
