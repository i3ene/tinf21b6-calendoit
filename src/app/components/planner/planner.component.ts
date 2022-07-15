import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FormComponent } from 'src/app/dialogues/form/form.component';
import { Data } from 'src/app/models/data.model';
import { Event } from 'src/app/models/event.model';
import { Habit } from 'src/app/models/habit.model';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {

  habit: Habit = new Habit({});
  form!: FormComponent;
  @ViewChild(FormComponent)
  set comp(v: FormComponent) {
    v.initializeControls();
    this.form = v;
  }

  constructor(private detector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.detector.detectChanges();
  }

  get data(): Data {
    return AppComponent.data;
  }

  addHabit(habit: Habit | Event): void {
    this.data.addHabit(new Habit(habit));
    this.habit = new Habit({});
    this.form.initializeControls(this.habit);
  }

}
