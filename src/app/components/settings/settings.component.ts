import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Data } from 'src/app/models/data.model';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  obj: any;

  constructor(public exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.obj = AppComponent.data.getSaveData();
  }

}
