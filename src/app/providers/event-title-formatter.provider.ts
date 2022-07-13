import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Habit } from '../models/habit.model';

@Injectable()
export class EventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  override month(event: CalendarEvent): string {
    return `<b>${formatDate(
      event.start,
      'H:mm',
      this.locale
    )}</b> <span class="${Habit.isHabit(event) ? 'cal-habit-title' : ''}">${
      event.title
    }</span>`;
  }

  override week(event: CalendarEvent): string {
    return `<b>${formatDate(
      event.start,
      'H:mm',
      this.locale
    )}</b> <span class="${Habit.isHabit(event) ? 'cal-habit-title' : ''}">${
      event.title
    }</span>`;
  }

  override day(event: CalendarEvent): string {
    return `<b>${formatDate(
      event.start,
      'H:mm',
      this.locale
    )}</b> <span class="${Habit.isHabit(event) ? 'cal-habit-title' : ''}">${
      event.title
    }</span>`;
  }
}
