import { Component, Input, OnInit } from '@angular/core';
import { Habit } from 'src/app/models/habit.model';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() habits: Habit[] = [];
}
