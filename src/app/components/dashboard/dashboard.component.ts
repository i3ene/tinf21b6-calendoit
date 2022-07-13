import {Component, OnInit} from '@angular/core';
import { AppComponent } from 'src/app/app.component';

import { XsltService } from 'src/app/services/xslt.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 xslt:XsltService;
  constructor(xsltService:XsltService) {
    this.xslt=xsltService;
  }

  ngOnInit(): void {
   
   this.xslt.asyncTransform('res/test.xsl', undefined, true).then(frag=>{document.getElementById("container")?.appendChild(frag);
   
  });   
  }
}
