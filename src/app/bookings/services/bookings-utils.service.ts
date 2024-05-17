import { Injectable } from '@angular/core';

import { BookableSpace } from '../classes/bookable-space.class';

@Injectable()
export class BookingsUtilsService {
  mapHasMinimunScreenWidthRequirement(screenWidth = 0) {
    return screenWidth >= 1200;
  }

  getBookableSpaceMapStyle(bookableSpace: BookableSpace) {
    const percentageTop = `${bookableSpace.top}%`;
    const percantageLeft = `${bookableSpace.left}%`;
    return `top:${percentageTop};left:${percantageLeft};transform: translate(-${percentageTop},-${percantageLeft});font-size:${bookableSpace.size}px;`;
  }

  getBookableSpaceFileName(spaceNumber: number) {
    return `./../../../../assets/sitio${spaceNumber}.svg`;
  }
}
