import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-confirm-message',
  templateUrl: './new-confirm-message.component.html',
  styleUrls: ['./new-confirm-message.component.scss']
})
export class NewConfirmMessageComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() no: string;
  @Input() yes: string;
  @Output() result: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  action(value: boolean){
    this.result.emit(value);
  }

}
