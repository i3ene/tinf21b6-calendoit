import { CalendarEvent } from 'angular-calendar';
import { Habit } from './habit.model';

export class Event implements CalendarEvent {

  /**
   * Title of this event
   */
   title: string;

   /**
    * Descrption of this event
    */
   description?: string;

   /**
    * Color object with `primary` and `secondary` color
    */
   color: {
     primary: string;
     secondary: string;
   };

  /**
   * Start of this event
   */
  start: Date;

  /**
   * End of this event
   */
  end: Date;

  /**
   * Repeating Days and how often/long
   */
  repeat?: {
    days: Event.DAY[],
    repeating: Date | number
  };

  /**
   * TODO: Position
   * ```js
   * {
   *  name?: string,
   *  lat: string,
   *  lng: string
   * }
   * ```
   */
  position?: any;

  /**
   * TODO: (CalendarEvent interface) All Day
   */
   allDay?: boolean;

  /**
   * TODO: (CalendarEvent interface) Draggable
   */
  draggable?: boolean;

  /**
   * TODO: (CalendarEvent interface) Resizable
   */
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };


  /**
   * If this is a reference of an other Event
   * (Generated through repeating etc.)
   */
  reference?: Event | Habit;

  constructor(obj: any) {
    this.start = obj.start ? new Date(obj.start) : new Date();
    this.end = obj.end ? new Date(obj.end) : new Date();

    this.title = obj.title ? obj.title : '';
    this.description = obj.description ? obj.description : undefined;

    this.color = {
      primary: obj.color && obj.color.primary ? obj.color.primary : '#009688',
      secondary: obj.color && obj.color.secondary ? obj.color.secondary : '#ffffff'
    }

    if (obj.repeat) {
      this.repeat = {
        days: obj.repeat.days ? obj.repeat.days : [0],
        repeating: obj.repeat.repeating ? (typeof obj.repeat.repeating == 'number' ? obj.repeat.repeating : new Date(obj.repeat.repeating)) : 1
      }
    }

    // TODO: Cast implementation of CalendarEvent

    this.reference = obj.reference ? obj.reference : undefined;
  }

  /**
   * If `repeating` is set, then it will return molecular Event items.
   * @returns Generated Event list
   */
  getEvents(): Event[] {
    // Check if it repeats and is no child
    if (this.repeat == undefined || this.reference) {
      return [new Event({...this, reference: this})]
    };
    
    let repeating = this.repeat.repeating;

    // Check if it is number. If yes, convert to Date
    if (typeof repeating === 'number') {
      repeating = Event.addWeeks(this.start, repeating);
      repeating = Event.addDays(repeating, -1);
    }

    // Iterate through the amount of days to repeat
    const arr: Event[] = [];
    const days = Event.diffTime(this.start, repeating, Event.TIME.ONE_DAY);
    for(let i = 0; i <= days; i++) {
      // Check if Day is in repeating defined
      const current = Event.addDays(this.start, i);
      if (this.repeat.days.includes(current.getDay())) {
        // Create new Date
        const newEvent: Event = new Event(this);
        newEvent.reference = this;
        newEvent.repeat = undefined;

        // Set to new Date
        const diffTime = Event.diffTime(this.start, this.end, 1);
        newEvent.start = current;
        newEvent.end = Event.addTime(current, diffTime);

        // Add to list
        arr.push(newEvent);
      }
    }

    return arr;
  }

}

export namespace Event {

  /**
   * Add number of miliseconds to an Date
   * @param date Start Date
   * @param mili Number of miliseconds
   * @returns A new Date with added miliseconds
   */
   export function addTime(date: Date, mili: number): Date {
    const newDate: Date = new Date(date);
    newDate.setTime(newDate.getTime() + mili);
    return newDate;
  }

  /**
   * Add number of days to an Date
   * @param date Start Date
   * @param days Number of days
   * @returns A new Date with added days
   */
  export function addDays(date: Date, days: number): Date {
    const newDate: Date = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  /**
   * Add number of weeks to an Date
   * @param date Start Date
   * @param weeks Number of weeks
   * @returns A new Date with added weeks
   */
  export function addWeeks(date: Date, weeks: number): Date {
    const newDate: Date = new Date(date);
    newDate.setDate(newDate.getDate() + (weeks * 7));
    return newDate;
  }

  /**
   * Get the difference in days between two Dates
   * @param date1 Date 1
   * @param date2 Date 2
   * @returns Number of days
   */
  export function diffTime(date1: Date, date2: Date, multiplier?: number): number {
    if (multiplier == undefined) multiplier = 1;
    const differenceMs = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(differenceMs / multiplier);
  }

  export function isOverlapping(date1Start: Date, date1End: Date, date2Start: Date, date2End: Date): boolean {
    return (date1Start.getTime() <= date2End.getTime() && date2Start.getTime() <= date1End.getTime());
  }

  export function isSameDay(date1: Date, date2: Date): boolean {
    return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate());
  }

  export function isBetweenTwoDates(checkDate: Date, startDate: Date, endDate: Date): boolean {
    return (startDate.getTime() < checkDate.getTime() && endDate.getTime() > checkDate.getTime());
  }

  export enum DAY {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
  }

  export enum TIME {
    ONE_SECOND = 1000,
    ONE_MINUTE = ONE_SECOND * 60,
    ONE_HOUR = ONE_MINUTE * 60,
    ONE_DAY = ONE_HOUR * 24,
    ONE_WEEK = ONE_DAY * 7
  }

}
