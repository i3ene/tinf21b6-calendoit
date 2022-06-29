import { Component, OnInit } from '@angular/core';
import { XsltService } from 'src/app/services/xslt.service';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  obj: any;

  constructor(private xsltService:XsltService,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.obj = this.xsltService.transformJSON("res/list.xml", "res/template.xsl");
  }


  private downloadService(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  //function to download data
  download(): void {
    this.downloadService('/downloads/test.zip')
      .subscribe(blob => saveAs(blob, 'test.zip'))
  }




}
