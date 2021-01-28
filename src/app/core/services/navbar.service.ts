import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private showHeader = new BehaviorSubject<boolean>(false);

  get isShowHeader() {
    return this.showHeader.asObservable();
  }

  get ShowHeaderValue() {
    return this.showHeader.value;
  }

  constructor() {}

  showHeaderTrue(test: boolean) {
    if (test) {
      this.showHeader.next(true);      
    } else {
      this.showHeader.next(false);
    }
  }
}
