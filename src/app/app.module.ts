import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WidgetComponent } from './components/dashboard/widget/widget.component';
import { PlannerComponent } from './components/planner/planner.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { SettingsComponent } from './components/settings/settings.component';
import { CreateEventComponent } from './components/planner/create-event/create-event.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ListViewComponent } from './components/planner/list-view/list-view.component';
import { CalendarBundleModule } from './modules/calendar.module';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

/**
 * Registering Language Localization
 */
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WidgetComponent,
    PlannerComponent,
    CalendarComponent,
    SettingsComponent,
    CreateEventComponent,
    SafeHtmlPipe,
    ListViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CalendarBundleModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
