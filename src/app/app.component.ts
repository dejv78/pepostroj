import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";

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
    public authService: AuthService,
  ) {
  }

}
