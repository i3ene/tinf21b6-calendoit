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
    // Time
    let text: string = `<b>${formatDate(event.start, 'H:mm', this.locale)}</b>`;
    // Title
    text += `<span class="${Habit.isHabit(event) ? 'cal-habit-title' : ''}">${
      event.title
    }</span>`;
    return text;
  }

  override week(event: CalendarEvent): string {
    // Time
    let text: string = `<b>${formatDate(event.start, 'H:mm', this.locale)}</b>`;
    // Title
    text += `<span class="${Habit.isHabit(event) ? 'cal-habit-title' : ''}">${
      event.title
    }</span>`;
    // Description
    text += `<p class="cal-event-description">${
      (event as any)?.description
    }</p>`;
    return text;
  }

  override day(event: CalendarEvent): string {
    // Time
    let text: string = `<b>${formatDate(event.start, 'H:mm', this.locale)}</b>`;
    // Title
    text += `<span class="${Habit.isHabit(event) ? 'cal-habit-title' : ''}">${
      event.title
    }</span>`;
    // Description
    text += `<p class="cal-event-description">${
      (event as any)?.description
    }</p>`;
    return text;
  }
}
