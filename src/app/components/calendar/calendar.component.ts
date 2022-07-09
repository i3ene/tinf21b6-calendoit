import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarUtils as CalendarUtilsClass,
  CalendarView,
} from 'angular-calendar';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  subDays,
} from 'date-fns';
import { Subject } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { Data } from 'src/app/models/data.model';
import { AppComponent } from 'src/app/app.component';
import { CreateEventComponent } from 'src/app/dialogues/create-event/create-event.component';
import { MatDialog } from '@angular/material/dialog';
import { EditEventComponent } from 'src/app/dialogues/edit-event/edit-event.component';
import { EventTitleFormatter } from 'src/app/providers/event-title-formatter.provider';
import { CalendarUtils } from 'src/app/providers/calendar-utils.provider';
import { DateFormatter } from 'src/app/providers/date-formatter.provider';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: EventTitleFormatter,
    },
    {
      provide: CalendarUtilsClass,
      useClass: CalendarUtils,
    },
    {
      provide: CalendarDateFormatter,
      useClass: DateFormatter,
    },
  ],
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = false;

  today: Date = new Date();

  refresh = new Subject<void>();

  get data(): Data {
    return AppComponent.data;
  }

  constructor(
    private dialog: MatDialog,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {}

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.data._events = this.data._events.map((iEvent) => {
      if (iEvent === event) {
        return new Event({
          ...event,
          start: newStart,
          end: newEnd,
        });
      }
      return iEvent;
    });
    this.handleEvent('DroppedOrResized', event as Event);
  }

  handleEvent(action: string, event: CalendarEvent<any> | Event): void {
    switch (action) {
      case 'Clicked':
        this.openEdit(event as Event);
        break;
      case 'DroppedOrResized':
        // TODO: Change Event times
        break;
      default:
        console.log({ event, action });
    }
  }

  /**
   * Add an Event to list and calendar.
   * (Will refresh the view of the calendar)
   * @param event The Event to add
   */
  addEvent(event: Event): void {
    this.data.addEvent(event);
    this.refresh.next();
  }

  /**
   * Delete an Event from list and calendar.
   * @param event The Event to delete
   */
  deleteEvent(event: Event) {
    this.data.deleEvent(event.reference ? event.reference : event);
    // TODO: Check if an event remains and keep open
    this.activeDayIsOpen = false;
  }

  /**
   * Open the dialog for adding an Event
   */
  openAdd(): void {
    let event: Event = new Event({});

    const ref = this.dialog.open(CreateEventComponent, {
      data: event,
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      if (result != 'Add') return;
      this.addEvent(event);
    });
  }

  /**
   * Open the dialog for editing an Event
   * @param event The Event to edit
   */
  openEdit(event: Event): void {
    let copy: Event = new Event(event.reference);

    const ref = this.dialog.open(EditEventComponent, {
      data: {
        event: event.reference,
        refresh: this.refresh
      },
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      switch (result) {
        case 'Save':
          return;
        case 'Delete':
          this.deleteEvent(event);
          return;
        default:
          Object.assign(event.reference!, copy);
      }
      this.refresh.next();
    });
  }
}
