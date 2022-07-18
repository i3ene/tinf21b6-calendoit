import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FormComponent } from 'src/app/dialogues/form/form.component';
import { Data } from 'src/app/models/data.model';
import { Event } from 'src/app/models/event.model';
import { Habit } from 'src/app/models/habit.model';
import { ListHabitComponent } from './list-habit/list-habit.component';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {

  habit: Habit = new Habit({});
  habitCopy?: Habit;
  selectedHabit?: Habit;

  form!: FormComponent;
  @ViewChild(FormComponent)
  set formComp(v: FormComponent) {
    v.initializeControls();
    this.form = v;
  }

  list!: ListHabitComponent;
  @ViewChild(ListHabitComponent)
  set listComp(v: ListHabitComponent) {
    v.updateList();
    this.list = v;
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
    this.list.updateList();
  }

  saveHabit(habit: Habit | Event): void {
    this.selectedHabit = undefined;
  }

  cancelHabit(): void {
    Object.assign(this.selectedHabit!, this.habitCopy);
    this.selectedHabit = undefined;
  }

  habitSelected(habit: Habit): void {
    this.selectedHabit = undefined;
    this.detector.detectChanges();

    this.habitCopy = new Habit(habit);
    this.selectedHabit = habit;
  }
}
