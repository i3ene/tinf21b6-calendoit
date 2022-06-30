import { Event } from './event.model';
import { Habit } from './habit.model';

export class Data {
  events: Event[];
  habits: Habit[];

  constructor(obj: any) {
    this.events = Data.parseArray(Event, obj.events);
    this.habits = Data.parseArray(Habit, obj.habits);
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
