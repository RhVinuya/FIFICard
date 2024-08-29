import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-layout-gifts',
  templateUrl: './new-layout-gifts.component.html',
  styleUrls: ['./new-layout-gifts.component.scss']
})
export class NewLayoutGiftsComponent implements OnInit {
  @Output() open: EventEmitter<string> = new EventEmitter();

  constructor() { }

  eventcategories: string[] = environment.giftscategories;
  eventrecipient: string[] = environment.giftsrecipients;

  ngOnInit(): void {
  }

  onClick(value: string) {
    this.open.emit(value);
  }
}
