import { Event } from './event.model';

export class Habit extends Event {
  deadline?: Date;

  habitBegin: Date;
  habitEnd: Date;

  alternateEvents: HabitEvent[];

  constructor(obj: any) {
    super(obj);

    this.deadline = obj.deadline ? new Date(obj.deadline) : undefined;

    this.habitBegin = obj.habitBegin ? new Date(obj.habitBegin) : new Date();
    this.habitEnd = obj.habitEnd ? new Date(obj.habitEnd) : new Date();

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
