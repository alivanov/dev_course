import { Component, OnInit } from '@angular/core';
import { LocalCounterService } from '../../services/local-counter.service';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-local-counter-two',
  templateUrl: './local-counter-two.component.html',
  styleUrls: ['./local-counter-two.component.scss'],
  providers: [LocalCounterService]
})
export class LocalCounterTwoComponent implements OnInit {

  constructor(public localCounterService: LocalCounterService,
              public counterService: CounterService) { }

  ngOnInit(): void {
  }

}
