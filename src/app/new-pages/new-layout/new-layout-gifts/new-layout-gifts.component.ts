import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-layout-gifts',
  templateUrl: './new-layout-gifts.component.html',
  styleUrls: ['./new-layout-gifts.component.scss']
})
export class NewLayoutGiftsComponent implements OnInit {

  constructor() { }

  eventcategories: string[] = environment.giftscategories;
  eventrecipient: string[] = environment.giftsrecipients;

  ngOnInit(): void {
  }

}
