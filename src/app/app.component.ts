import { Component, HostListener } from '@angular/core';
import packageJson from '../../package.json';
import { Data } from './models/data.model';
import { Theme } from './models/theme.model';
import { ThemeService } from './services/theme.service';
import { XsltService } from './services/xslt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CalenDoIt';
  version = packageJson.version;

  /**
   * Catch close event and show confirmation message if data changed
   * @param event Event
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    //return false;
  }

  /**
   * Global data stack. Contains `Events` and `Habits`.
   */
  public static data: Data;

  /**
   * Load Data with XSLT Service
   * @param xml Path to XML
   * @param xsl Path to XSL
   */
  static loadData(xsl: string, xml: string | Document): void {
    var obj = new XsltService().transformJSON(xsl, xml);
    AppComponent.data = new Data(obj.root);
    AppComponent.data.recalculate();
  }

  constructor(public themeService: ThemeService) {
    AppComponent.loadData('res/json.xsl', 'res/data.xml');
  }

  get theme() {
    return Theme;
  }
}
