import { Event } from './event.model';

export class Habit extends Event {
  deadline?: Date;

  begin: Date;
  finish: Date;

  alternateEvents: HabitEvent[];

  constructor(obj: any) {
    super(obj);

    this.deadline = obj.deadline ? new Date(obj.deadline) : undefined;

    this.begin = obj.begin ? new Date(obj.begin) : new Date();
    this.finish = obj.finish ? new Date(obj.finish) : new Date();

    this.alternateEvents = obj.alternateEvents ? obj.alternateEvents : [];
  }
}

export class HabitEvent extends Event {
  persistent: boolean;

  constructor(obj: any) {
    super(obj);

    this.persistent = obj.persistent ? obj.persistent : false;
  }
}
