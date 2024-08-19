import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-events-options',
  templateUrl: './new-events-options.component.html',
  styleUrls: ['./new-events-options.component.scss']
})
export class NewEventsOptionsComponent implements OnInit {
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>()

  @Input() events: string[];

  constructor() { }

  ngOnInit(): void {
  }

  click(value: string){
    this.onClick.emit(value);
  }
}
