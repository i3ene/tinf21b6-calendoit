import { Component, Input, OnInit } from '@angular/core';
import { Habit } from 'src/app/models/habit.model';

@Component({
  selector: 'app-list-habit',
  templateUrl: './list-habit.component.html',
  styleUrls: ['./list-habit.component.scss'],
})
export class ListHabitComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() habits: Habit[] = [];
}
