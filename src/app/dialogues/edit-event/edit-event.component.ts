import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  days: { name: string; key: number }[] = [];

  event: Event;

  dateRange: { from: Date; to: Date } = { from: new Date(), to: new Date() };

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    range: new FormControl(),
    colorPrimary: new FormControl(),
    repeat: new FormControl(),
    colorSecondary: new FormControl(),
    days: new FormControl(),
    toggle: new FormControl(),
    count: new FormControl(),
    deadline: new FormControl(),

    start: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.event = data.event;
    this.generateDayNames();
    this.initializeEvent();
  }

  ngOnInit(): void {
    this.form.controls['repeat'].valueChanges.subscribe((value) => {
      if (value) {
        this.event.repeat = {
          days: [this.getSelectedDay()],
          repeating: 1,
        };
        this.form.controls['start'].setValue(this.event.start);
      } else {
        this.event.repeat = undefined;
      }
    });
    this.form.controls['toggle'].valueChanges.subscribe((value) => {
      if (this.event.repeat != undefined) {
        if (value) {
          this.event.repeat.repeating = 1;
          this.form.controls['count'].setValue(1);
        }
        else {
          this.event.repeat.repeating = this.event.end;
        }
      }
    });
    this.form.controls['range'].valueChanges.subscribe((value) => {
      this.event.start = value.from;
      this.event.end = value.to;

      this.form.controls['startTime'].setValue(value.from);
      this.setSelectedDay();
    });

    this.form.controls['start'].valueChanges.subscribe((value) => {
      this.event.start = value;
      this.event.end = value;
      this.form.controls['startTime'].setValue(value);
      this.form.controls['endTime'].setValue(value);
      this.setSelectedDay();
    });
    this.form.controls['startTime'].valueChanges.subscribe((value) => {
      const startDate = this.form.controls['start'].value as Date;
      const startTime = value as Date;
      startDate.setHours(startTime.getHours());
      startDate.setMinutes(startTime.getMinutes());
      
      this.event.start = startDate;
      const endDate = this.form.controls['endTime'].value as Date;
      if (!endDate || startDate.getTime() > endDate.getTime()) this.form.controls['endTime'].setValue(startDate);
    });
    this.form.controls['endTime'].valueChanges.subscribe((value) => {
      let endDate = value as Date;
      if (this.event.repeat) {
        const startDate = new Date(this.event.start);
        startDate.setHours(endDate.getHours());
        startDate.setMinutes(endDate.getMinutes());
        endDate = startDate;
      }
      this.event.end = endDate;

      if (this.event.repeat && !this.form.controls['toggle'].value) {
        const startDate = value as Date;
        const deadlineDate = this.form.controls['deadline'].value as Date;
        if (!deadlineDate || Event.addDays(startDate, 1).getTime() > deadlineDate.getTime()) {
          this.form.controls['deadline'].setValue(Event.addDays(startDate, 1));
        }
      }
    });

    this.form.controls['count'].valueChanges.subscribe((value) => {
      if (this.event.repeat) this.event.repeat.repeating = value;
    });

  }

  initializeEvent(): void {
    this.dateRange = { from: this.event.start, to: this.event.end };
    this.form.controls['range'].setValue(this.dateRange);
    this.form.controls['start'].setValue(this.event.start);
    this.form.controls['startTime'].setValue(this.event.start);
    this.form.controls['endTime'].setValue(this.event.end);
    if (this.event.repeat) {
      this.form.controls['repeat'].setValue(true);
      if (typeof this.event.repeat.repeating === 'number') {
        this.form.controls['toggle'].setValue(true);
        this.form.controls['count'].setValue(this.event.repeat.repeating);
      }
      this.form.controls['days'].setValue(this.event.repeat.days);
    }
  }

  generateDayNames(): void {
    let count = 0;
    for (var item in Event.DAY) {
      var isValueProperty = parseInt(item, 10) >= 0;
      if (isValueProperty) {
        this.days.push({ name: Event.DAY[item], key: count });
        count++;
      }
    }
  }

  getSelectedDay(): number {
    return (this.form.controls['start'].value as Date).getDay();
  }

  setSelectedDay(): void {
    if (!this.form.controls["start"].value) return;
    this.form.controls['days'].setValue([this.getSelectedDay()]);
  }

  isCurrentDay(day: number): boolean {
    return this.getSelectedDay() == day;
  }

  minTime(): Date {
    return this.form.controls['startTime'].value as Date;
  }
}
