import { Component } from '@angular/core';
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
   * Localization String
   */
  public static locale: string = 'de';

  /**
   * Global data stack. Contains `Events` and `Habits`.
   */
  public static data: Data;

  /**
   * Load Data with XSLT Service
   * @param xml Path to XML
   * @param xsl Path to XSL
   */
  static loadData(xml: string, xsl: string): void {
    var obj = new XsltService().transformJSON(xml, xsl);
    AppComponent.data = new Data(obj.root);
  }

  constructor(public themeService: ThemeService) {
    AppComponent.loadData('res/test.xml', 'res/template.xsl');
  }

  get theme() {
    return Theme;
  }

}
