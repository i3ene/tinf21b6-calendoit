import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

import { XsltService } from 'src/app/services/xslt.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private xsltService: XsltService) {
  }

  ngOnInit(): void {
    this.xsltService.asyncTransform('res/test.xsl', undefined, true).then((frag) => {
      document.getElementById('container')?.appendChild(frag);
    });
  }
}
