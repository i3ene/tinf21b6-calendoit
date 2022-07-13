import {
  ChangeDetectionStrategy,
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
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { EventTitleFormatter } from 'src/app/providers/event-title-formatter.provider';
import { CalendarUtils } from 'src/app/providers/calendar-utils.provider';
import { DateFormatter } from 'src/app/providers/date-formatter.provider';
import { CreateEditEventComponent } from 'src/app/dialogues/create-edit-event/create-edit-event.component';
import { Habit } from 'src/app/models/habit.model';
import { UtilDate } from 'src/app/models/util.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  events: Event[] = [];

  navigation: string = 'today';

  constructor(
    private dialog: MatDialog,
    @Inject(LOCALE_ID) public locale: string
  ) {
    // Update event list
    this.refresh.subscribe(() => this.refreshEvents());
    // Update selected day
    this.refresh.subscribe(() => {
      for(const event of this.events) {
        if (isSameDay(event.start, this.viewDate) || UtilDate.isBetweenTimespan(this.viewDate, event.start, event.end)) {
          this.activeDayIsOpen = true;
          return;
        }
      }
      this.activeDayIsOpen = false;
    });
  }

  ngOnInit(): void {
    AppComponent.data.recalculate();
    this.refresh.next();
  }

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
    AppComponent.data._events = AppComponent.data._events.map((iEvent) => {
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
    AppComponent.data.addEvent(event);
    this.refresh.next();
  }

  /**
   * Delete an Event from list and calendar.
   * @param event The Event to delete
   */
  deleteEvent(event: Event) {
    AppComponent.data.deleEvent(event.reference ? event.reference : event);
  }

  /**
   * Open the dialog for adding an Event
   */
  openAdd(): void {
    let event: Event = new Event({});

    const ref = this.dialog.open(CreateEditEventComponent, {
      data: {
        event: event,
        isEditMode: false,
      },
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
  openEdit(event: Event | Habit): void {
    const isHabit = (event.reference as Habit).idealTime != undefined

    let copy: Event | Habit = isHabit ? new Habit(event.reference) : new Event(event.reference);

    const ref = this.dialog.open(CreateEditEventComponent, {
      data: {
        event: event.reference,
        refresh: this.refresh,
        isEditMode: true,
        isHabit: isHabit
      },
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      switch (result) {
        case 'Save':
          AppComponent.data.recalculate();
          break;
        case 'Delete':
          this.deleteEvent(event);
          break;
        default:
          Object.assign(event.reference!, copy);
          break;
      }
      this.refresh.next();
    });
  }

  /**
   * Get current event list of data
   */
  refreshEvents(): void {
    this.events = AppComponent.data.getEvents();
  }

  onNavigationChange(event: any, element: any): void {
    if (event != undefined) element.value = undefined;
  }
}
