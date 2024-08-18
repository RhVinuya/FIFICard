import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-rate',
  templateUrl: './new-rate.component.html',
  styleUrls: ['./new-rate.component.scss']
})
export class NewRateComponent implements OnInit {
  @Input() size: 'sm' | 'lg' = 'lg';
  @Input() set rate(value: number) {
    this._rate = value
  }

  constructor() { }

  _rate: number = 0

  ngOnInit(): void {
  }

}
