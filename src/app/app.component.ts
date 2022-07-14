import {Component} from '@angular/core';
import packageJson from '../../package.json';
import {Data} from './models/data.model';
import {Theme} from './models/theme.model';
import {ThemeService} from './services/theme.service';
import {XsltService} from './services/xslt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CalenDoIt';
  version = packageJson.version;

  /**
   * Global data stack. Contains `Events` and `Habits`.
   */
  public static data: Data;

  /**
   * Load Data with XSLT Service
   * @param xml Path to XML
   * @param xsl Path to XSL
   */
  static loadData(xsl: string, xml: string): void {
    var obj = new XsltService().transformJSON(xsl, xml);
    AppComponent.data = new Data(obj.root);
  }

  constructor(public themeService: ThemeService) {
    AppComponent.loadData('res/json.xsl', 'res/data.xml');
  }

  get theme() {
    return Theme;
  }

}
