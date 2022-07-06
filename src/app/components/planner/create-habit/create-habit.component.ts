import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Habit, HabitEvent } from 'src/app/models/habit.model';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.component.html',
  styleUrls: ['./create-habit.component.scss'],
})
export class CreateHabitComponent implements OnInit {
  @Input() events: Habit[] = [];
  @Output() addHabit: EventEmitter<Habit> = new EventEmitter<Habit>();
  form: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    deadline: new FormControl(),
    begin: new FormControl(),
    finish: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}

  add(): void {
    this.addHabit.emit(
      new Habit({
        deadline: new Date(this.form.controls['deadline'].value),
        begin: new Date(this.form.controls['begin'].value),
        finish: new Date(this.form.controls['finish'].value),
        title: this.form.controls['title'].value,
        description: this.form.controls['description'].value,
      })
    );
    this.form.reset();
    //for(const control of Object.keys(this.form.controls))this.form.controls[control].reset()
  }
}
