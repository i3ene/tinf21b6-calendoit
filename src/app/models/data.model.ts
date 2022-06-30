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
}
