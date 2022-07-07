import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  days: { name: string; key: number }[] = [];

  event: Event;

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
    colorPrimary: new FormControl(),
    repeat: new FormControl(),
    colorSecondary: new FormControl(),
    days: new FormControl(),
    toggle: new FormControl(),
    count: new FormControl(),
    deadline: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.event = new Event({});
  }

  ngOnInit(): void {
    this.form.controls['repeat'].valueChanges.subscribe((value) => {
      this.event.repeat = value
        ? ({ days: [], repeating: undefined } as any)
        : undefined;
    });
    this.form.controls['toggle'].valueChanges.subscribe((value) => {
      if (this.event.repeat)
        this.event.repeat.repeating = value ? 0 : (undefined as any);
    });

    this.generateDayNames();
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

  isFormValid(): boolean {
    if (this.form.controls['repeat'].value) {
      if (!this.form.controls['days'].value) return false;
      if (this.form.controls['toggle'].value) {
        if (!this.form.controls['count'].value) return false;
      } else if (!this.form.controls['deadline'].value) return false;
    }
    return this.form.valid;
  }
}
