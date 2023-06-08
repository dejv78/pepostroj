import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {AppService} from "./services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items = [
    {
      label: 'Projekty',
      icon: 'pi pi-car',
      routerLink: ['/projects']
    },
    {
      label: 'Pracovníci',
      icon: 'pi pi-user',
      routerLink: ['/people']
    },
  ]


  constructor(
    public appService: AppService,
    public authService: AuthService,
  ) {
  }

  public toggleTheme() {
    const theme: string = (this.appService.currentTheme() == 'theme-mdc-light') ? 'theme-mdc-dark' : 'theme-mdc-light';
    this.appService.switchTheme(theme);
  }
}
