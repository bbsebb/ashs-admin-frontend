import {booleanAttribute, computed, inject, Injectable, signal, Signal} from '@angular/core';
import Keycloak from "keycloak-js";
import {KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs} from "keycloak-angular";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakEventSignal = inject(KEYCLOAK_EVENT_SIGNAL);
  private readonly _isLoggedInSignal;
  private _user = signal<User|undefined>(undefined);

  constructor() {
    this._isLoggedInSignal = computed(() => {
      const keycloakEvent = this.keycloakEventSignal();
      if (keycloakEvent.type === KeycloakEventType.Ready) {
        return typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }
      return false;
    });
    this.loadUserProfileInUserSignal();
  }

  get isLoggedInSignal(): Signal<boolean> {
    return this._isLoggedInSignal;
  }

  get user(): Signal<User|undefined> {
    return this._user;
  }

  private isLoggedIn(): Signal<boolean> {
    return this._isLoggedInSignal;
  }

  private loadUserProfileInUserSignal():void {
    if(this.keycloak.authenticated) {
      this.keycloak.loadUserProfile().then(
        profile => {
          const user = {
            name: `${profile.firstName} ${profile.lastName}`,
            email: profile.email,
            username: profile.username
          }
        this._user.set(user);

        },
        e => {
          this._user.set(undefined);
        }
      );
    }
  }

  public logout() {
    this.keycloak.logout().then();
  }

  public login() {
    this.keycloak.login().then();
  }
}

