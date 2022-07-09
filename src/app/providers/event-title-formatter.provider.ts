import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { AppComponent } from '../app.component';

@Injectable()
export class EventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  override month(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'H:m', this.locale)}</b> ${
      event.title
    }`;
  }

  override week(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'H:m', this.locale)}</b> ${
      event.title
    }`;
  }

  override day(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'H:m', this.locale)}</b> ${
      event.title
    }`;
  }
}
