import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Data } from 'src/app/models/data.model';
import { Habit } from 'src/app/models/habit.model';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get data(): Data {
    return AppComponent.data;
  }
}
