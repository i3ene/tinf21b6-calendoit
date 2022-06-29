import { Component, OnInit } from '@angular/core';
import { Habit, HabitEvent } from 'src/app/models/habit.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  events: Habit[] = [];

  constructor() {}

  ngOnInit(): void {}

  addEvent(
    deadline: string,
    habitbeginn: string,
    habitEnd: string,
    title: string,
    description: string
  ): void {
    this.events.push(
      new Habit({
        deadline: new Date(deadline),
        habitBegin: new Date(habitbeginn),
        habitEnd: new Date(habitEnd),
        title: title,
        description: description,
      })
    );
    console.log(this.events);
  }
}
