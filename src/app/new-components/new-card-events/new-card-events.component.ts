import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-card-events',
  templateUrl: './new-card-events.component.html',
  styleUrls: ['./new-card-events.component.scss']
})
export class NewCardEventsComponent implements OnInit {
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  events = environment.events;

  ngOnInit(): void {
  }

  click(value: string){
    this.onClick.emit(value);
  }

}
