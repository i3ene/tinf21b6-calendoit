import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { AppComponent } from '../app.component';
import { XsltService } from './xslt.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient, private xsltService: XsltService) { }

  /**
   * Function to download data
   */
  public download(): void {
    var text = new XMLSerializer().serializeToString(this.xsltService.saveXML(AppComponent.data.getSaveData(), true));
    var blob = new Blob([text], { type: 'text/xml' });
    saveAs(blob, 'data.xml')
  }


  // TODO: Upload data

}
