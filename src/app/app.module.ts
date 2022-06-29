import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WidgetComponent} from './components/dashboard/widget/widget.component';
import { PlannerComponent } from './components/planner/planner.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarBundleModule } from './modules/calendar.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateEventComponent } from './components/planner/create-event/create-event.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WidgetComponent,
    PlannerComponent,
    CalendarComponent,
    SettingsComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CalendarBundleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
