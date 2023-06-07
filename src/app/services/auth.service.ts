import {computed, effect, Injectable, Signal} from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {toSignal} from "@angular/core/rxjs-interop";
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public user: Signal<any>;
  public userDisplayName: Signal<string>;
  public isLoggedIn: Signal<boolean>;

  constructor(
    public auth: AngularFireAuth,
  ) {
    this.user = toSignal(auth.user);

    //effect(() => console.log(JSON.stringify(this.user(), null, 2)));

    this.userDisplayName = computed(() => {
      const u = this.user();
      return !!u ? u.displayName : '< Nepřihlášený uživatel >';
    })

    this.isLoggedIn = computed(() => !!this.user());
  }

  public async googleLogin() {
    return await this.login(new GoogleAuthProvider());
  }

  public async logout() {
    await this.auth.signOut();
  }


  private async login(provider: any) {
    try {
      const credential = await this.auth.signInWithPopup(provider);
      console.log('Logged in');
    } catch (e) {
      console.log(e);
    }
  }

}
