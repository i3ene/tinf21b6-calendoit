import { CalendarEvent } from 'angular-calendar';

export class Event implements CalendarEvent {
  /**
   * Start of this event
   */
  start: Date;

  /**
   * End of this event
   */
  end: Date;

  // TODO: repeat
  // TODO: position
  // TODO: CalendarEvent interface implementation (draggable, resizable, ...)

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
