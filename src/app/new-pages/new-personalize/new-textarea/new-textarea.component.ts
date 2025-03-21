import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { concat } from 'rxjs';
import { INewPersonalizeDetail } from 'src/app/new-models/new-personalize';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-textarea',
  templateUrl: './new-textarea.component.html',
  styleUrls: ['./new-textarea.component.scss']
})
export class NewTextareaComponent implements OnInit {

  @Input() detail: INewPersonalizeDetail;
  @Output() onChange: EventEmitter<INewPersonalizeDetail> = new EventEmitter();

  ref: ChangeDetectorRef;

  constructor(
    private elRef: ElementRef,
    _ref: ChangeDetectorRef
  ) { 
    this.ref = _ref;
  }


  fonts = environment.fontstyles;
  colors = environment.fontcolors;

  text: string;
  placeholder: string = 'Add your greetings/message';
  font: string;
  color: string;
  size: number;
  alignment: 'left' | 'center' | 'right';
  isDisplay: boolean = false;

  ngOnInit(): void {
    this.text = this.detail.text;
    this.font = this.detail.font;
    this.color = this.detail.color
    this.size = this.detail.size;
    this.alignment = this.detail.alignment;
  }

  onClick() {
    this.isDisplay = true;
  }

  onBlur(event: FocusEvent): void {
    const divElement = event.target as HTMLDivElement;
    const content = divElement.textContent || '';
    this.text = content;
    this.detail.text = content;
    this.onChange.emit(this.detail);
    this.ref.detectChanges();
  }

  changeFont(event: Event): void {
    const selectedFont = (event.target as HTMLSelectElement).value;
    this.font = selectedFont;
    this.detail.font = selectedFont;
    this.onChange.emit(this.detail);
    this.ref.detectChanges();
  }

  changeColor(event: Event): void {
    const selectedColor = (event.target as HTMLInputElement).value;
    this.color = selectedColor;
    this.detail.color = selectedColor;
    this.onChange.emit(this.detail);
    this.ref.detectChanges();
  }

  onFontMinus() {
    if (this.size !== 10) {
      this.size = this.size - 1;
      this.detail.size = Number(this.size);
      this.onChange.emit(this.detail);
      this.ref.detectChanges();
    }
  }

  onFontAdd() {
    if (this.size < 50) {
      this.size = this.size + 1;
      this.detail.size = Number(this.size);
      this.onChange.emit(this.detail);
      this.ref.detectChanges();
    }
  }

  changeSize(event: Event): void {
    const size = (event.target as HTMLInputElement).value;
    this.onChange.emit(this.detail);
    this.ref.detectChanges();
  }

  changeAllignment(alignment: 'left' | 'center' | 'right') {
    this.alignment = alignment
    this.detail.alignment = alignment;
    this.onChange.emit(this.detail);
    this.ref.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isDisplay = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.isDisplay = false;
    }
  }
}
