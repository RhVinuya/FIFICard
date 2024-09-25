import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-events-options',
  templateUrl: './new-events-options.component.html',
  styleUrls: ['./new-events-options.component.scss']
})
export class NewEventsOptionsComponent implements OnInit {
  @Input() events: string[];
  @Input() set selected(value: string) {
    this.select = value;
  }
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  select: string = '';

  ngOnInit(): void {
  }

  click(value: string){
    this.onClick.emit(value);
  }
}
