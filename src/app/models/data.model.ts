import { Event } from './event.model';
import { Habit, HabitEvent } from './habit.model';

export class Data {
  events: Event[];
  habits: Habit[];

  constructor(obj: any) {
    this.events = Data.parseArray(Event, obj.events);
    this.habits = Data.parseArray(Habit, obj.habits);
  }

  /**
   * Add an {@link Event Event} to the list.
   * This will trigger recalculation of the alternate {@link HabitEvent HabitEvents}.
   * @param event Event to add
   */
  addEvent(event: Event): void {
    this.events.push(event);
    this.recalculate();
  }

  /**
   * Add an {@link Habit Habit} to the list.
   * This will trigger recalculation of the alternate {@link HabitEvent HabitEvents}.
   * @param habit Habit to add
   */
  addHabit(habit: Habit): void {
    this.habits.push(habit);
    this.recalculate();
  }

  /**
   * Delete an {@link Event Event} of the list.
   * @param element An {@link Event Event} or the index
   */
  deleEvent(element: Event | number): void {
    var event: Event;
    if (typeof element === 'number') event = this.events[element as number];
    else event = element as Event;

    this.events = this.events.filter(item => !Data.equals(item, event));
    this.recalculate();
  }

  /**
   * Delete an {@link Habit Habit} of the list.
   * @param element A {@link Habit Habit} or the index
   */
  deleteHabit(element: Habit | number): void {
    var habit: Habit;
    if (typeof element === 'number') habit = this.habits[element as number];
    else habit = element as Habit;

    this.habits = this.habits.filter(item => !Data.equals(item, habit));
    this.recalculate();
  }

  /**
   * Recalculate all alternate {@link HabitEvent HabitEvents}.
   */
  recalculate(): void {
    // TODO: Recalculate Habits
  }

  /**
   * Get a single array of events and habits.
   * This contains normal {@link Event Events}, {@link Habit Habits} and {@link HabitEvent HabitEvents}.
   * @returns Array of events
   */
  getEvents(): Event[] {
    // TODO: Logic that returns Events and Habits (as Events)
    return [];
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
