import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {saveAs} from 'file-saver';
import {AppComponent} from '../app.component';
import {XsltService} from './xslt.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private httpClient: any;

  constructor(private http: HttpClient, private xsltService: XsltService) {
    this.httpClient = http;

  }

  /**
   * Function to download data
   */
  public download(): void {
    var text = new XMLSerializer().serializeToString(this.xsltService.saveXML(AppComponent.data.getSafeData()));
    var blob = new Blob([text], {type: 'text/xml'});
    saveAs(blob, 'data.xml')
  }


  private headers = new HttpHeaders()
    .set('content-type', 'application/xml')
    .set('Access-Control-Allow-Origin', '*');

  postFile(fileToUpload: File): Observable<HttpEvent<any>> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', new Blob([fileToUpload], {type: 'text/xml'}), fileToUpload.name);


    const req = new HttpRequest('POST', endpoint, this.headers);
    return this.http.request(req);
  }


}
