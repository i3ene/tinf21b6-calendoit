import { Component, OnInit } from '@angular/core';
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
    this.obj = this.xsltService.transformJSON("res/list.xml", "res/template.xsl"); 
  }

}
