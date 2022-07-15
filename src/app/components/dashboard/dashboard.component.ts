import { Component, HostListener, OnInit } from '@angular/core';

import { XsltService } from 'src/app/services/xslt.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private xsltService: XsltService) {}

  ngOnInit(): void {
    this.xsltService
      .asyncTransform('res/view.xsl', undefined, true)
      .then((frag) => {
        document.getElementById('container')?.appendChild(frag);
      });
  }

  /**
   * Listen to external event `toggle-expand-habits`
   * @param event Window event
   */
  @HostListener('window:toggle-expand-habits', ['$event'])
  toggleExpandHabits(event: any) {
    console.log(event);
  }
}
