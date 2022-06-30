import { CalendarEvent } from 'angular-calendar';

export class Event implements CalendarEvent {
  start: Date;
  end: Date;

  // TODO: repeat
  // TODO: position
  // TODO: CalendarEvent interface implementation (draggable, resizable, ...)

  title: string;
  description?: string;

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
