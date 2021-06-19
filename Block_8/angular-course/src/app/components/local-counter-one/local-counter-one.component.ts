import { Component, OnInit } from '@angular/core';
import { LocalCounterService } from '../../services/local-counter.service';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-local-counter-one',
  templateUrl: './local-counter-one.component.html',
  styleUrls: ['./local-counter-one.component.scss'],
  providers: [LocalCounterService]
})
export class LocalCounterOneComponent implements OnInit {

  constructor(public localCounterService: LocalCounterService,
              public counterService: CounterService) { }

  ngOnInit(): void {
  }

}
