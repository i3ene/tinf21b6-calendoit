import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Habit } from 'src/app/models/habit.model';
import { UtilDate } from 'src/app/models/util.model';

@Component({
  selector: 'app-list-habit',
  templateUrl: './list-habit.component.html',
  styleUrls: ['./list-habit.component.scss'],
})
export class ListHabitComponent implements OnInit {
  @Input() habits: Habit[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['title', 'description', 'time', 'repeat', 'actions'];
  dataSource!: MatTableDataSource<Habit>;

  constructor() {}

  ngOnInit(): void {
    this.updateList();
  }

  updateList(): void {
    this.dataSource = new MatTableDataSource<Habit>(this.habits);
    this.dataSource.paginator = this.paginator;
  }

  calcTimespan(element: Habit): number {
    let timespan = element.end.getTime() - element.start.getTime();
    let percentage = timespan / UtilDate.TIME.ONE_DAY * 100;
    return percentage;
  }

  calcTimespanOffset(element: Habit): number {
    let startDate = new Date(element.start);
    startDate.setSeconds(0);
    startDate.setMinutes(0);
    startDate.setHours(0);
    let timespan = element.start.getTime() - startDate.getTime();
    let percentage = timespan / UtilDate.TIME.ONE_DAY * 100;
    return percentage;
  }

  calcTime(element: Habit): number {
    let idealTime = new Date(element.idealTime);
    idealTime.setMinutes(idealTime.getMinutes() + element.duration);
    let timespan = idealTime.getTime() - element.idealTime.getTime();
    let percentage = timespan / (element.end.getTime() - element.start.getTime()) * 100;
    return percentage;
  }

  calcTimeOffset(element: Habit): number {
    let timespan = element.idealTime.getTime() - element.start.getTime();
    let percentage = timespan / (element.end.getTime() - element.start.getTime()) * 100;
    return percentage;
  }
}
