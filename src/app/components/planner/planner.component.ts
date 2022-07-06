import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { HabitHelpComponent } from 'src/app/dialogues/habit-help/habit-help.component';
import { Data } from 'src/app/models/data.model';
import { Habit } from 'src/app/models/habit.model';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  get data(): Data {
    return AppComponent.data;
  }

  openHelp(): void {
    this.dialog.open(HabitHelpComponent);
  }
}
