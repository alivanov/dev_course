export class CounterService {
  counter = 0;

  increase() {
    this.counter++;
  }

  decrease() {
    this.counter--;
  }
}
