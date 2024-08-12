import { environment } from 'src/environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit {
  @Input() placeholder: string;
  @Input() maxlength: number = 500;
  @Output() changeText: EventEmitter<any> = new EventEmitter();

  constructor() { }

  min: number = 14;
  max: number = 40;
  fonts = environment.fontstyles;
  colors = environment.fontcolors;

  text: string = '';
  fontstyle: string = environment.fontstyles[0];
  fontcolor: string = environment.fontcolors[0].hex
  fontsize: number = this.min
  alignment: 'left' | 'center' | 'right' = 'left';
  position: number = 0;
  toggle: boolean = false;

  ngOnInit(): void {
  }

  changeStyle(event: any){
    this.fontstyle = event.target.value;
    this.sendChanges();
  }

  changeColor(event: any){
    this.fontcolor = event.target.value;
    this.sendChanges();
  }

  changeSize(event: any){
    let value: number = Number(event.target.value);
    if (value < this.min)
      value = this.min;
    else if (value > this.max)
      value = this.max;
    this.fontsize = value;
    this.sendChanges();
  }

  changeAlignment(allign: 'left' | 'center' | 'right'){
    this.alignment = allign;
    this.sendChanges();
  }

  keyup(event: any){
    this.position = event.target.selectionEnd;
    this.text = event.target.value;
    this.sendChanges();
  }

  focus(event: any) {
    this.position = event.target.selectionEnd;
  }

  click(event: any){
    this.position = event.target.selectionEnd;
  }

  sendChanges(){
    let message ={
      text: this.text,
      fontstyle: this.fontstyle, 
      fontcolor: this.fontcolor, 
      fontsize: this.fontsize,
      alignment: this.alignment
    }
    this.changeText.emit(message);
  }

  emoji(display: boolean){
    this.toggle = display;
  }


  addEmoji(event: any) {
    if (this.position == this.text.length) {
      this.text += event.emoji.native 
    }
    else {
      this.text = this.text.substring(0, this.position) + event.emoji.native + this.text.substring(this.position);
    }
    this.position = this.position + event.emoji.native.length;
    this.toggle = false;
  }

}
