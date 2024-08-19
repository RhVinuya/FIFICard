import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-layout-stickers',
  templateUrl: './new-layout-stickers.component.html',
  styleUrls: ['./new-layout-stickers.component.scss']
})
export class NewLayoutStickersComponent implements OnInit {

  constructor() { }

  events: string[] = environment.stickerevents;

  ngOnInit(): void {
  }

}
