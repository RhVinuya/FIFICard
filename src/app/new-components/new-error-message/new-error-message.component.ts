import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-error-message',
  templateUrl: './new-error-message.component.html',
  styleUrls: ['./new-error-message.component.scss']
})
export class NewErrorMessageComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() button: string;

  @Output() onContinue: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickContinue(){
    this.onContinue.emit(true);
  }
}
