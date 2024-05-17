import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

@Injectable()
export class DateUtilsService {
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Europe/Madrid');
  }

  daysJsUtc(date?: Date | dayjs.Dayjs | string | null) {
    return dayjs.utc(date);
  }

  toFullDateFormat(date?: Date | dayjs.Dayjs | string | null) {
    return this.daysJsUtc(date).format('DD/MM/YYYY');
  }

  toHHmmFormat(date?: Date | dayjs.Dayjs | string | null) {
    return this.daysJsUtc(date).format('HH:mm');
  }
}
