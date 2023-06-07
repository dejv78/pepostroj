import {Component, computed, OnDestroy, Signal, signal, WritableSignal} from '@angular/core';
import {Auth, signInWithPopup, user, User, EmailAuthProvider} from "@angular/fire/auth";
import {Observable, Subscription} from "rxjs";
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
      label: 'Lidé',
      icon: 'pi pi-user',
      routerLink: ['/people']
    },
  ]


  constructor(
    public authService: AuthService,
  ) {
  }

}
