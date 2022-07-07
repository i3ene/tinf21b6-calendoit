import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {

  event: Event;

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
    colorPrimary: new FormControl(),
    colorSecondary: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.event = new Event({});
  }

  ngOnInit(): void {}
}
