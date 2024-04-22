import {
  Component,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  Output,
} from '@angular/core';

import { UtilsService } from '../../../common/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@Injectable()
export class HeaderComponent {
  @Input() title: string;
  @Input() isModal: boolean;
  @Output() closeModalEvent = new EventEmitter();
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

  closeModal() {
    this.closeModalEvent.emit();
  }
}
