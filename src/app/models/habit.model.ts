import { Event } from './event.model';

export class Habit extends Event {
  /**
   * The ideal start time
   */
  idealTime: Date;

  /**
   * The duration (in Minutes) of this Habit
   */
  duration: number;

  /**
   * Events that have an alternative time than the ideal time
   */
  alternateEvents: HabitEvent[];

  constructor(obj: any) {
    super(obj);

    this.idealTime = obj.idealTime ? new Date(obj.idealTime) : new Date();
    this.duration = obj.duration ? obj.duration : 0;

    this.alternateEvents = obj.alternateEvents ? obj.alternateEvents : [];
  }
}

export class HabitEvent extends Event {
  persistent: boolean;
  problem?: boolean

  constructor(obj: any) {
    super(obj);

    this.persistent = obj.persistent ? obj.persistent : false;
    this.problem = obj.problem ? obj.problem : undefined;
  }
}
