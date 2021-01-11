import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showSpinner = new EventEmitter<boolean>();

  constructor() { }

  set(show: boolean) {
    this.showSpinner.emit(show)
  }

  get() {
    return this.showSpinner
  }

}
