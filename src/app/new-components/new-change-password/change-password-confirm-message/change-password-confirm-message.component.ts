import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-change-password-confirm-message',
  templateUrl: './change-password-confirm-message.component.html',
  styleUrls: ['./change-password-confirm-message.component.scss']
})
export class ChangePasswordConfirmMessageComponent implements OnInit {

  @Output() onContinue: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  result: boolean = false

  ngOnInit(): void {
  }

  onClickContinue(){
    this.onContinue.emit(true);
  }

}
