import {Component, OnInit} from '@angular/core';
import {AppComponent} from 'src/app/app.component';
import {ExchangeService} from 'src/app/services/exchange.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  obj: any;
  file: any;

  constructor(public exchangeService: ExchangeService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  //Daten anzeigen
  private getData(): void {
    AppComponent.data.recalculate();
    this.obj = AppComponent.data.getSafeData();
  }
}
