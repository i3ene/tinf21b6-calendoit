import {Component} from '@angular/core';
import packageJson from '../../package.json';
import { Theme } from './models/theme.model';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendoit';
  version = packageJson.version;

  constructor(public themeService: ThemeService) { }

  get theme() {
    return Theme;
  }

}
