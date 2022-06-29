import { Event } from "./event.model";

export class Habit extends Event {
    deadline?: Date;

    habitBegin: Date;
    habitEnd: Date;

    alternateEvents: HabitEvent[];

    constructor(obj: any) {
        super(obj);

        this.deadline = obj.deadline ? obj.deadline : null;

        this.habitBegin = obj.habitBegin ? obj.habitBegin : new Date();
        this.habitEnd = obj.habitEnd ? obj.habitEnd : new Date();

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