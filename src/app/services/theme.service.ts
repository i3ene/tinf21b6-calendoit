import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LocalConfig } from '../models/config.model';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * Constructor of Theme
   * @param document for document operations
   */
  constructor(@Inject(DOCUMENT) private document: Document) {
    // Check document theme
    for (var theme in Theme.Mode) {
      if (
        this.document.documentElement.classList.contains(Theme.getTheme(theme))
      ) {
        Theme.currentTheme = theme as Theme.Mode;
      }
    }
    Theme.currentTheme =
      Theme.currentTheme == undefined ? Theme.defaultTheme : Theme.currentTheme;

    // Check chache theme
    if (localStorage[LocalConfig.theme])
      this.selectTheme(localStorage[LocalConfig.theme] as Theme.Mode);

    this.selectTheme(Theme.getTheme(Theme.currentTheme));

    // Listen for local 'storage' changes
    window.addEventListener('storage', (e: any) => this.onThemeChange(e), true);
  }

  /**
   * Change {@link Theme.Mode theme}
   * @param theme new theme
   */
  selectTheme(theme: Theme.Mode): void {
    if (theme == undefined) theme = Theme.defaultTheme as Theme.Mode;
    localStorage[LocalConfig.theme] = theme;

    if (Theme.currentTheme == theme) return;
    else Theme.currentTheme = theme;

    // Remove every theme
    for (var themeKey in Theme.Mode) {
      this.document.documentElement.classList.remove(
        Theme.Mode[themeKey as keyof typeof Theme.Mode]
      );
    }

    // Add selected theme
    this.document.documentElement.classList.add(theme);
  }

  toggleTheme(): void {
    this.selectTheme(
      (Theme.currentTheme as Theme.Mode) == Theme.Mode.light
        ? Theme.Mode.dark
        : Theme.Mode.light
    );
  }

  /**
   * Eventhandler for local 'storage'.
   *
   * Listens for changes made to the {@link LocalConfig.theme theme}
   * @param e event
   */
  onThemeChange(e: any): void {
    if (e.key == LocalConfig.theme) {
      this.selectTheme(localStorage[LocalConfig.theme] as Theme.Mode);
    }
  }
}

/**
 * Gets the key of an enum by a value
 * @param myEnum the enum
 * @param enumValue value to search for
 * @returns key of enum
 */
export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): keyof T | null {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}
