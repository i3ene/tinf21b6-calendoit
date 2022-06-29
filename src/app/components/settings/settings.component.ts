import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { XsltService } from 'src/app/services/xslt.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  obj: any;

  constructor(private xsltService:XsltService) { }

  ngOnInit(): void {
    this.obj = this.xsltService.transformJSON("res/test.xml", "res/template.xsl");

    let events: Event[] = [
      {
        startDate: new Date(),
        endDate: new Date(),
        title: 'test1',
        description: '1test1',
        color: '#000000',
        textColor: '#FFFFFF'
      },
      {
        startDate: new Date(),
        endDate: new Date(),
        title: 'test2',
        description: '2test2',
        color: '#000000',
        textColor: '#FFFFFF'
      },
      {
        startDate: new Date(),
        endDate: new Date(),
        title: 'test3',
        description: '3test3',
        color: '#000000',
        textColor: '#FFFFFF'
      }
    ];

    this.xsltService.saveXML(events);

    var test: any = {
      test: [1, 2, 3],
      arr: [
        { att1: "test", att4: {
          btt1: "bgrh", hdtgh: new Date()
        }},
        { att2: "test", att5: 7},
        { att3: "test", att6: 9},
      ]
    }

    this.xsltService.saveXML(test);

  }

}
