import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-add-cart-button',
  templateUrl: './new-add-cart-button.component.html',
  styleUrls: ['./new-add-cart-button.component.scss']
})
export class NewAddCartButtonComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<NewAddCartButtonComponent>;

  offCanvas: NgbOffcanvas

  constructor(
    _offCanvas: NgbOffcanvas
  ) {
    this.offCanvas = _offCanvas;
  }

  isHover: boolean = false;
  ref: NgbOffcanvasRef;

  ngOnInit(): void {
  }

  mouserEnter() {
    this.isHover = true;
  }

  mouseLeave() {
    this.isHover = false;
  }

  openCanvas() {
    this.ref = this.offCanvas.open(this.content, { position: 'end' });
  }

  closeCanvas() {
    this.ref.close();
  }
}
