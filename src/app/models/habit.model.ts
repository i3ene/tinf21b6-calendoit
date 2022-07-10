import { Event } from './event.model';

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

    // TODO: Parse correctly (with reference)
    this.alternateEvents = obj.alternateEvents ? obj.alternateEvents : [];
  }

  override getEvents(): Event[] {
    const list = super.getEvents();

    for (const item of list) {
      // Set ideal Time
      item.start.setHours(this.idealTime.getHours());
      item.start.setMinutes(this.idealTime.getMinutes());

      // Calculate end Date
      item.end = Event.addTime(item.start, this.duration * Event.TIME.ONE_MINUTE);
    }

    return list;
  }

  getHabits(): Event[] {
    const list = this.getEvents();

    for (const item of list) {      
      // Check for alternative Events
      for (const alternate of this.alternateEvents) {
        // If alternative Event exists for this day, set its start Date
        if (Event.isSameDay(item.start, alternate.start)) {
          item.start = alternate.start;
          // Calculate end Date
          item.end = Event.addTime(item.start, this.duration * Event.TIME.ONE_MINUTE);
        }
      }
    }

    return list;
  }

}

export class HabitEvent extends Event {
  persistent: boolean;
  problem?: boolean

  constructor(obj: any) {
    super(obj);

    this.persistent = obj.persistent ? obj.persistent : false;
    this.problem = obj.problem ? obj.problem : undefined;
  }
}
