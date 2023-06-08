import {Inject, Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class AppService {

  public currentTheme: WritableSignal<string> = signal('theme-mdc-light');

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
    this.currentTheme.set(theme);
  }


}
