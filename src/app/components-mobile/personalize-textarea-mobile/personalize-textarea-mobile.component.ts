import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INewPersonalizeDetail } from 'src/app/new-models/new-personalize';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personalize-textarea-mobile',
  templateUrl: './personalize-textarea-mobile.component.html',
  styleUrls: ['./personalize-textarea-mobile.component.scss']
})
export class PersonalizeTextareaMobileComponent implements OnInit {

  @Input() detail : INewPersonalizeDetail;
  @Input() fieldNumber : number;
  @Output() onChange: EventEmitter<INewPersonalizeDetail> = new EventEmitter();

  text: string;
  placeholder: string = 'Add your greetings/message';
  font: string;
  color: string;
  size: number;
  alignment: 'left' | 'center' | 'right';
  showPersonalize = false;
  
  fonts = environment.fontstyles;
  colors = environment.fontcolors;

  constructor() { }

  ngOnInit(): void {
    this.placeholder = 'Field #' + this.fieldNumber + ': Add your greetings/message';
    this.text = this.detail.text;
    this.font = 'Playball';
    this.color = '#800000';
    this.size = 16;
    this.alignment = this.detail.alignment;
  }

  onBlur(event: FocusEvent): void {
    const divElement = event.target as HTMLDivElement;
    const content = divElement.textContent || '';
    this.text = content;
    this.detail.text = content;
    this.onChange.emit(this.detail);
  }

  changeFont(event: Event): void {
    const selectedFont = (event.target as HTMLSelectElement).value;
    this.font = selectedFont;
    this.detail.font = selectedFont;
    this.onChange.emit(this.detail);
  }

  changeColor(event: Event): void {
    const selectedColor = (event.target as HTMLInputElement).value;
    this.color = selectedColor;
    this.detail.color = selectedColor;
    this.onChange.emit(this.detail);
  }

  onFontMinus() {
    if (this.size !== 10) {
      this.size = this.size - 1;
      this.detail.size = Number(this.size);
      this.onChange.emit(this.detail);
    }
  }

  onFontAdd() {
    if (this.size < 50) {
      this.size = this.size + 1;
      this.detail.size = Number(this.size);
      this.onChange.emit(this.detail);
    }
  }

  changeSize(event: Event): void {
    const size = (event.target as HTMLInputElement).value;
    this.onChange.emit(this.detail);
  }

  changeAllignment(alignment: 'left' | 'center' | 'right') {
    this.alignment = alignment;
    this.detail.alignment = alignment;
    this.onChange.emit(this.detail);
  }


}
