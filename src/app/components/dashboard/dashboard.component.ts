import {Component, HostListener, OnInit} from '@angular/core';
import { AppComponent } from 'src/app/app.component';

import {XsltService} from 'src/app/services/xslt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private xsltService: XsltService) {
  }

  ngOnInit(): void {
    this.xsltService
      .asyncTransform('res/dashboard.xsl', this.getDashboardXML())
      .then((frag) => {
        document.getElementById('container')?.appendChild(frag);
      });
  }

  getDashboardXML(): any {
    return this.xsltService.saveXML(this.getDashboardData(), true);
  }

  getDashboardData(): any {
    const data = {
      events: AppComponent.data.events,
      habits: AppComponent.data._habits,
    };

    for (const habit of data.habits) {
      for (const alternate of habit.alternateEvents) {
        alternate.reference = undefined;
      }
    }

    for (const event of data.events) {
      event.reference = undefined;
    }

    return data
  }

  /**
   * Listen to external event `toggle-expand-habits`
   * @param event Window event
   */
  @HostListener('window:toggle-expand-habits', ['$event'])
  toggleExpandHabits(event: any) {
    var node = event.explicitOriginalTarget;
    const expanded = this.toggleExpandBody(node);
    this.changeIcon(node, expanded);
  }

  /**
   * Toggle expanding of body node
   * @param node Starting node
   * @returns `true` if expanded
   */
  toggleExpandBody(node: any): boolean {
    while (!Array.from(node.classList).includes('mat-expansion-panel')) {
      node = node.parentNode;
    }
    node = node.childNodes[1];
    var classes = node.classList;
    var index = Array.from(classes).indexOf('minimized');
    if (index == -1) {
      classes.add('minimized');
      return false;
    } else {
      classes.remove('minimized');
      return true;
    }
  }

  /**
   * Change navigation icon
   * @param node Starting node
   * @param isExpanded If is expanding icon
   */
  changeIcon(node: any, isExpanded: boolean): void {
    while (!Array.from(node.classList).includes('mat-icon')) {
      node = node.childNodes[0];
    }
    if (isExpanded) node.innerHTML = 'expand_more';
    else node.innerHTML = 'navigate_before';
  }
}
