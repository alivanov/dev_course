import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'}) // now we don't need to use providers array for this service
export class CounterService {
  counter = 0;

  increase() {
    this.counter++;
  }

  decrease() {
    this.counter--;
  }
}
