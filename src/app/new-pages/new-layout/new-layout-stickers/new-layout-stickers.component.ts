import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-layout-stickers',
  templateUrl: './new-layout-stickers.component.html',
  styleUrls: ['./new-layout-stickers.component.scss']
})
export class NewLayoutStickersComponent implements OnInit {
  @Output() open: EventEmitter<string> = new EventEmitter();

  events: string[] = environment.stickerevents;

  ngOnInit(): void {
  }

  onClick(value: string) {
    this.open.emit(value);
  }

}
