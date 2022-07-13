import { Event } from './event.model';
import { HabitEvent } from './habit-event.model';
import { UtilDate } from './util.model';

export class Habit extends Event {
  /**
   * The ideal start time
   */
  idealTime: Date;

  /**
   * The duration (in Minutes) of this Habit
   */
  duration: number;

  /**
   * Events that have an alternative time than the ideal time
   */
  alternateEvents: HabitEvent[];

  constructor(obj: any) {
    super(obj);

    this.idealTime = obj.idealTime ? new Date(obj.idealTime) : new Date();
    this.duration = obj.duration ? obj.duration : 0;

    this.alternateEvents = obj.alternateEvents ? obj.alternateEvents : [];
  }

  override getEvents(): Event[] {
    const list = super.getEvents();

    for (const item of list) {
      // Set ideal Time
      item.start.setHours(this.idealTime.getHours());
      item.start.setMinutes(this.idealTime.getMinutes());

      // Calculate end Date
      item.end = UtilDate.addTime(item.start, this.duration * UtilDate.TIME.ONE_MINUTE);
    }

    return list;
  }

  /**
   * Generates a new list with molecular habit events
   * @returns Generated Habit list
   */
  getHabits(): Event[] {
    const list = this.getEvents();

    for (const item of list) {
      // Check for alternative Events
      for (const alternate of this.alternateEvents) {
        // If alternative Event exists for this day, set its start Date
        if (UtilDate.isSameDay(item.start, alternate.start)) {
          item.start = alternate.start;
          // Calculate end Date
          item.end = UtilDate.addTime(item.start, this.duration * UtilDate.TIME.ONE_MINUTE);
        }
      }
    }

    return list;
  }

}

export namespace Habit {
  export function isHabit(event: any): boolean {
    return ((event as Event).reference as Habit).idealTime != undefined;
  }
}
