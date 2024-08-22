import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-info-message',
  templateUrl: './new-info-message.component.html',
  styleUrls: ['./new-info-message.component.scss']
})
export class NewInfoMessageComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() button: string;

  @Output() onContinue: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  result: boolean = false

  ngOnInit(): void {
  }

  onClickContinue(){
    this.onContinue.emit(true);
  }

}
