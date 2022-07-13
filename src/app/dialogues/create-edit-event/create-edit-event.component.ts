import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/app/models/event.model';
import { UtilDate } from 'src/app/models/util.model';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss'],
})
export class CreateEditEventComponent implements OnInit {

  /**
   * If editing an event or creating a new one
   */
  isEditMode: boolean;

  /**
   * If event is repeating
   */
  isRepeating: boolean;

  /**
   * Current selected tab for repeating options
   */
  selectedTab: number = 0;

  /**
   * Form group for individual controls
   */
  form: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),

    colorPrimary: new FormControl(),
    colorSecondary: new FormControl(),

    startDate: new FormControl(),
    endDate: new FormControl(),

    startTime: new FormControl(),
    endTime: new FormControl(),

    days: new FormControl(),

    count: new FormControl(),
    deadline: new FormControl(),
  });

  /**
   * Array for selecting repeating days
   */
  days: any[];

  constructor(
    public dialogRef: MatDialogRef<CreateEditEventComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { isEditMode: boolean; event: Event; refresh?: any }
  ) {
    this.days = UtilDate.getDays();
    this.isEditMode = data.isEditMode;
    this.isRepeating = data.event.repeat != undefined;
    this.initializeControls(this.data.event);
  }

  /**
   * Initialize UI to show correct data
   * @param event Event to show data of
   */
  initializeControls(event: Event): void {
    this.setValue('title', event.title);
    this.setValue('description', event.description);

    this.setValue('colorPrimary', event.color.primary);
    this.setValue('colorSecondary', event.color.secondary);

    this.setValue('startDate', event.start);
    this.setValue('endDate', event.end);

    this.setValue('startTime', event.start);
    this.setValue('endTime', event.end);

    if (this.isRepeating) {
      this.setValue('days', event.repeat?.days);

      if (typeof event.repeat?.repeating === 'number') {
        this.selectedTab = 1;
        this.setValue('count', event.repeat?.repeating);
      } else {
        this.selectedTab = 2;
        this.setValue('deadline', event.repeat?.repeating);
      }
    }
  }

  /**
   * Set a safe value for a control
   * @param control The control to set value for
   * @param value The value to set
   */
  setValue(control: string, value: any): void {
    if (value == undefined) return;
    this.form.controls[control].setValue(value);
  }

  ngOnInit(): void {
    this.form.controls['title'].valueChanges.subscribe((value) => {
      this.titleChanged(value);
    });
    this.form.controls['description'].valueChanges.subscribe((value) => {
      this.descriptionChanged(value);
    });
    this.form.controls['colorPrimary'].valueChanges.subscribe((value) => {
      this.colorPrimaryChanged(value);
    });
    this.form.controls['colorSecondary'].valueChanges.subscribe((value) => {
      this.colorSecondaryChanged(value);
    });
    this.form.controls['startDate'].valueChanges.subscribe((value) => {
      this.startDateChanged(value);
    });
    this.form.controls['endDate'].valueChanges.subscribe((value) => {
      this.endDateChanged(value);
    });
    this.form.controls['startTime'].valueChanges.subscribe((value) => {
      this.startTimeChanged(value);
    });
    this.form.controls['endTime'].valueChanges.subscribe((value) => {
      this.endTimeChanged(value);
    });
    this.form.controls['days'].valueChanges.subscribe((value) => {
      this.daysChanged(value);
    });
    this.form.controls['count'].valueChanges.subscribe((value) => {
      this.countChanged(value);
    });
    this.form.controls['deadline'].valueChanges.subscribe((value) => {
      this.deadlineChanged(value);
    });
  }

  /**
   * Validator for the whole form
   * @returns `true` if everything is correctly filled out
   */
  isFormValid(): boolean {
    if (!this.data.event.title) return false;
    if (!this.data.event.start) return false;
    if (!this.data.event.end) return false;
    if (!this.data.event.color.primary) return false;
    if (!this.form.controls['endDate'].value) return false;
    return true;
  }

  /**
   * Checks if a day of the week is the same as the currently selected
   * @param dayWeekNumber Day of the week as number [Sunday=0, Monday=1, Tuesday=2, ...]
   * @returns `true` if is same day
   */
  isCurrentDay(dayWeekNumber: number): boolean {
    return this.data.event.start.getDay() == dayWeekNumber;
  }

  /**
   * Refresh selection UI for days
   */
  refreshDays(): void {
    this.setValue('days', [this.data.event.start.getDay()]);
  }

  /**
   * The minimal possible time to select
   * @returns Date of the event start
   */
  minTime(): Date {
    return new Date(this.data.event.start);
  }

  /**
   * On change of tab selection
   * @param event Tab event
   */
  tabChange(event: any): void {
    this.selectedTab = event.index;
    this.repeatingChanged(event.index > 0);

    switch (event.index) {
      case 1:
        this.setValue('count', 1);
        break;
      case 2:
        this.setValue('deadline', this.data.event.end);
        break;
    }
  }

  //** Handler **//

  titleChanged(value: string): void {
    this.data.event.title = value;
  }

  descriptionChanged(value: string): void {
    this.data.event.description = value;
  }

  colorPrimaryChanged(value: string): void {
    if (this.data.event.color != undefined)
      this.data.event.color.primary = value;
    else this.data.event.color = { primary: value, secondary: '#ffffff' };
  }

  colorSecondaryChanged(value: string): void {
    if (this.data.event.color != undefined)
      this.data.event.color.secondary = value;
    else this.data.event.color = { primary: '#ffffff', secondary: value };
  }

  startDateChanged(value: Date): void {
    if (value == null) return;
    this.data.event.start.setFullYear(value.getFullYear());
    this.data.event.start.setMonth(value.getMonth());
    this.data.event.start.setDate(value.getDate());
    this.setValue('startTime', this.data.event.start);
    this.refreshDays();

    if (
      this.isRepeating &&
      this.selectedTab == 2 &&
      (this.data.event.repeat?.repeating as Date) < this.data.event.start
    )
      this.setValue('deadline', this.data.event.start);
  }

  endDateChanged(value: Date): void {
    if (value == null) return;
    this.data.event.end.setFullYear(value.getFullYear());
    this.data.event.end.setMonth(value.getMonth());
    this.data.event.end.setDate(value.getDate());
    this.setValue('endTime', this.data.event.end);
  }

  startTimeChanged(value: Date): void {
    if (value == null) return;
    this.data.event.start.setHours(value.getHours());
    this.data.event.start.setMinutes(value.getMinutes());
    this.data.event.start.setSeconds(value.getSeconds());
  }

  endTimeChanged(value: Date): void {
    if (value == null) return;
    this.data.event.end.setHours(value.getHours());
    this.data.event.end.setMinutes(value.getMinutes());
    this.data.event.end.setSeconds(value.getSeconds());

    if (this.data.event.end < this.data.event.start) {
      this.data.event.end = new Date(this.data.event.start);
      this.setValue('endDate', this.data.event.end);
    }
  }

  daysChanged(value: UtilDate.DAY[]): void {
    if (this.data.event.repeat == undefined) return;
    this.data.event.repeat!.days = value;
  }

  countChanged(value: number): void {
    this.data.event.repeat!.repeating = value;
  }

  deadlineChanged(value: Date): void {
    this.data.event.repeat!.repeating = value;
  }

  repeatingChanged(value: boolean): void {
    this.isRepeating = value;

    if (this.isRepeating) {
      if (this.data.event.repeat == undefined) {
        this.data.event.repeat = {
          days: [this.data.event.start.getDay()],
          repeating: 1,
        };
      }
      this.setValue('endDate', this.data.event.start);
      this.refreshDays();
    } else {
      this.data.event.repeat = undefined;
    }
  }
}
