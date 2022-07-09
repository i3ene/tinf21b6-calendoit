import { CalendarEvent } from 'angular-calendar';

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
   * TODO: Repeating
   * ```js
   * {
   *  days: DAY[],
   *  repeating: Date | number
   * }
   * ```
   */
  repeat?: any;

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

  constructor(obj: any) {
    this.start = obj.start ? new Date(obj.start) : new Date();
    this.end = obj.end ? new Date(obj.end) : new Date();

    this.title = obj.title ? obj.title : '';
    this.description = obj.description ? obj.description : undefined;

    // TODO: Cast implementation of CalendarEvent

    this.color = {
      primary: obj.color && obj.color.primary ? obj.color.primary : '',
      secondary: obj.color && obj.color.secondary ? obj.color.secondary : ''
    }
  }

}
