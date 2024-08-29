import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-layout-postcards',
  templateUrl: './new-layout-postcards.component.html',
  styleUrls: ['./new-layout-postcards.component.scss']
})
export class NewLayoutPostcardsComponent implements OnInit {
  @Output() open: EventEmitter<string> = new EventEmitter();

  constructor() { }

  events: string[] = environment.postcardevents;

  ngOnInit(): void {
  }

  onClick(value: string) {
    this.open.emit(value);
  }


}
