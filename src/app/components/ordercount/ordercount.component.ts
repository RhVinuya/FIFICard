import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordercount',
  templateUrl: './ordercount.component.html',
  styleUrls: ['./ordercount.component.scss']
})
export class OrdercountComponent implements OnInit {
  @Input() sold: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
