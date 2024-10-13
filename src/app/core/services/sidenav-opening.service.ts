import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavOpeningService {
  isOpen = signal(false);


  constructor() { }

  toggle() {
    this.isOpen.update(value => !value);
  }

}
