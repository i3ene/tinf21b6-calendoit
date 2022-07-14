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
  file: any

  constructor(public exchangeService: ExchangeService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.obj = AppComponent.data.getSafeData();

  }

  handleFileInput(event: Event) {

    var reader: FileReader = new FileReader();
    let fileToUpload: any = (event.target as HTMLInputElement)
    var text: string = '';


    reader.readAsArrayBuffer(fileToUpload.files[0])
    reader.onloadend = function (res) {
      if (res.target?.readyState != FileReader.DONE) {
        return;
      }
      var arrayBuffer = res.target.result;
      var buffer = new Uint8Array(arrayBuffer as any);
      for (const byte of buffer) {
        text += String.fromCharCode(byte);
      }
      console.log(text);
    }

    AppComponent.loadData(text, '/res/template.xsl')

  }


}
