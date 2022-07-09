import { Event } from './event.model';
import { Habit, HabitEvent } from './habit.model';

export class Data {
  _events: Event[];
  _habits: Habit[];

  constructor(obj: any) {
    this._events = Data.parseArray(Event, obj.events);
    this._habits = Data.parseArray(Habit, obj.habits);
  }

  get events(): Event[] {
    return this.getEvents();
  }

  /**
   * Add an {@link Event Event} to the list.
   * This will trigger recalculation of the alternate {@link HabitEvent HabitEvents}.
   * @param event Event to add
   */
  addEvent(event: Event): void {
    this._events.push(event);
    this.recalculate();
  }

  /**
   * Add an {@link Habit Habit} to the list.
   * This will trigger recalculation of the alternate {@link HabitEvent HabitEvents}.
   * @param habit Habit to add
   */
  addHabit(habit: Habit): void {
    this._habits.push(habit);
    this.recalculate();
  }

  /**
   * Delete an {@link Event Event} of the list.
   * @param element An {@link Event Event} or the index
   */
  deleEvent(element: Event | number): void {
    var event: Event;
    if (typeof element === 'number') event = this._events[element as number];
    else event = element as Event;

    this._events = this._events.filter(item => !Data.equals(item, event));
    this.recalculate();
  }

  /**
   * Delete an {@link Habit Habit} of the list.
   * @param element A {@link Habit Habit} or the index
   */
  deleteHabit(element: Habit | number): void {
    var habit: Habit;
    if (typeof element === 'number') habit = this._habits[element as number];
    else habit = element as Habit;

    this._habits = this._habits.filter(item => !Data.equals(item, habit));
    this.recalculate();
  }

  /**
   * Recalculate all alternate {@link HabitEvent HabitEvents}.
   */
  recalculate(): void {
    const events: Event[] = [];
    for(const event of this._events) {
      for (const mEvent of event.getEvents()) {
        events.push(mEvent);
      }
    }
    events.sort((a, b) => a.start.getTime() > b.start.getTime() ? 1 : -1);

    for(const habit of this._habits) {
      habit.alternateEvents = [];
      for (const mHabit of habit.getHabits()) {
        for (const event of events) {
          if (Event.isOverlapping(mHabit.start, mHabit.end, event.start, event.end)) {
            habit.alternateEvents.push(this.calculateAlternateEvent(mHabit, events));
          }
        }
      }
    }
  }

  calculateAlternateEvent(habitEvent: Event, events: Event[]): HabitEvent {
    const alternate = new HabitEvent(habitEvent);
    const habit = habitEvent.reference as Habit;
    const filteredEvents = events.filter(x => Event.isOverlapping(habit.start, habit.end, x.start, x.end));
    const timeSlots: { start: Date; end: Date; duration: number }[] = [];

    // Sort after start date
    filteredEvents.sort((a, b) => a.start.getTime() > b.start.getTime() ? 1 : -1);
    // Calculate available time between start of habit range and first event
    const firstEvent = filteredEvents[0];
    if (!Event.isBetweenTwoDates(habit.start, firstEvent.start, firstEvent.end)) {
      const firstSlot = this.calculateTimeSlot(firstEvent.start, habit.start);
      if (firstSlot.duration > habit.duration * Event.TIME.ONE_MINUTE) timeSlots.push(firstSlot);
    }

    // Calculate available times between start and end of habit with each event in between
    for(let i = 1; i < filteredEvents.length; i++) {
      const first = filteredEvents[i-1];
      const second = filteredEvents[i];

      if (Event.isOverlapping(first.start, first.end, second.start, second.end)) break;
      const newSlot = this.calculateTimeSlot(second.start, first.end);
      if (newSlot.duration > habit.duration * Event.TIME.ONE_MINUTE) timeSlots.push(newSlot);
    }

    // Sort after end date
    filteredEvents.sort((a, b) => a.end.getTime() > b.end.getTime() ? 1 : -1);
    // Calculate available time between end of habit range and last event
    const lastEvent = filteredEvents[filteredEvents.length - 1];
    if (!Event.isBetweenTwoDates(habit.end, lastEvent.start, lastEvent.end)) {
      const lastSlot = this.calculateTimeSlot(lastEvent.end, habit.end);
      if (lastSlot.duration > habit.duration * Event.TIME.ONE_MINUTE) timeSlots.push(lastSlot);
    }

    // Get nearest time slot to ideal time
    let nearestSlot: { difference: number, isStart: boolean, slot: { start: Date; end: Date; duration: number } | undefined } = { difference: Number.MAX_VALUE, isStart: false, slot: undefined };
    for(const slot of timeSlots) {
      let diffStart = Math.abs(habit.idealTime.getTime() - slot.start.getTime());
      let diffEnd = Math.abs(habit.idealTime.getTime() - slot.end.getTime());
      let isStartNearest;
      let shortestDiff; 
      if (diffStart < diffEnd) {
        shortestDiff = diffStart;
        isStartNearest = true;
      } else {
        shortestDiff = diffEnd;
        isStartNearest = false;
      }

      if (shortestDiff < nearestSlot.difference) nearestSlot = { difference: shortestDiff, isStart: isStartNearest, slot: slot };
    }

    // Calculate best start for alternate event
    if (nearestSlot.isStart) {
      alternate.start = nearestSlot.slot!.start;
    } else {
      alternate.start = Event.addTime(nearestSlot.slot!.end, habit.duration * Event.TIME.ONE_MINUTE * -1);
    }

    return alternate;
  }

  calculateTimeSlot(date1: Date, date2: Date): { start: Date; end: Date; duration: number } {
    const slot = {
      start: date1.getTime() > date2.getTime() ? date2 : date1,
      end: date1.getTime() < date2.getTime() ? date2 : date1,
      duration: Event.diffTime(date1, date2)
    }
    return slot;
  }



  /**
   * Get a single array of events and habits.
   * This contains normal {@link Event Events}, {@link Habit Habits} and {@link HabitEvent HabitEvents}.
   * @returns Array of events
   */
  getEvents(): Event[] {
    const list: Event[] = [];
    for (const event of this._events) {
      for (const molecular of event.getEvents()) list.push(molecular);
    }

    for (const habit of this._habits) {
      for (const molecular of habit.getHabits()) {
        list.push(molecular);
      }
    }

    return list;
  }



  getSaveData(): any {
    const data = {
      events: this._events,
      habits: this._habits
    };

    for(const habit of data.habits) {
      for(const alternate of habit.alternateEvents) {
        alternate.reference = undefined;
      }
    }

    return data;
  }

}

export namespace Data {
  /**
   * Parse an Object Array into the specified Class Array
   * @param clazz The Class to cast into
   * @param arr The Array to cast
   * @returns Casted Array
   */
  export function parseArray(
    clazz: { new (...args: any): any },
    arr: any[]
  ): any[] {
    const eventArr: typeof clazz[] = [];
    if (Array.isArray(arr)) {
      for (const entry of arr) eventArr.push(new clazz(entry));
    }
    return eventArr;
  }

  /**
   * Compares two Object based on their values.
   * @param obj1 Object1
   * @param obj2 Obect2
   * @returns `true` if every Value and Attribute are equal based on their content.
   */
  export function equals(obj1: any, obj2: any): boolean {
    if (obj1 == undefined || obj2 == undefined) return obj1 == obj2;
    for(const key of Object.keys(obj1)) {
      if (typeof obj1[key] === 'object') {
        if (!equals(obj1[key], obj2[key])) return false;
      }
      if (obj1[key] != obj2[key]) return false;
    }
    return true;
  }
}
