import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { Data } from 'src/app/models/data.model';
import { AppComponent } from 'src/app/app.component';
import { CreateEventComponent } from 'src/app/dialogues/create-event/create-event.component';
import { MatDialog } from '@angular/material/dialog';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  today: Date = new Date();

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];

  refresh = new Subject<void>();


  get data(): Data{
    return AppComponent.data;
  }

  get locale(): string {
    return AppComponent.locale;
  }

  activeDayIsOpen: boolean = true;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
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
    this.data.events = this.data.events.map((iEvent) => {
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
    switch(action) {
      case "Clicked":
        this.openEdit(event as Event);
        break;
      case "DroppedOrResized":
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
    this.data.deleEvent(event);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  /**
   * Open the dialog for adding an Event
   */
  openAdd(): void {
    const ref = this.dialog.open(CreateEventComponent, {
      disableClose: true
    });

    ref.afterClosed().subscribe(result => {
      if(result != "Add") return;
      this.addEvent(ref.componentInstance.event);
    });
  }

  openEdit(event: Event): void {

  }

}
