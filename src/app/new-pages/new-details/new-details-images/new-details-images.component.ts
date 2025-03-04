import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-details-images',
  templateUrl: './new-details-images.component.html',
  styleUrls: ['./new-details-images.component.scss']
})
export class NewDetailsImagesComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<NewDetailsImagesComponent>;

  @Input() set images(value: string[]) {
    this._images = value;
    if (this._images.length > 0) this.selected = this._images[0]
    this.ref.detectChanges();
  }

  @Input() set stickerimage(value: string) {
    console.log(value)
    this.sticker = value
  }

  modalService: NgbModal;
  ref: ChangeDetectorRef;

  constructor(
    _modalService: NgbModal,
    _ref: ChangeDetectorRef
  ) { 
    this.modalService = _modalService;
    this.ref = _ref;
  }

  _images: string[] = [];
  selected: string = '';
  display: string = '';
  modalRef: NgbModalRef;
  sticker: string = '';

  ngOnInit(): void {}

  onClickItem(value: string) {
    this.selected = value;
  }

  openGallery(value: string) {
    this.display = value
    this.modalRef = this.modalService.open(this.modal, { animation: true, fullscreen: true });
  }

  onClickDisplay(value: string) {
    this.display = value;
  }

  onClose() {
    this.modalRef.close();
  }

  onPrev(){
    let idx = this._images.findIndex(x => x === this.display);
    if (idx !== 0) {
      this.display = this._images[idx - 1];
    }
    else {
      this.display = this._images[this._images.length - 1];
    }
  }

  onNext(){
    let idx = this._images.findIndex(x => x === this.display);
    if (idx !== (this._images.length - 1)) {
      this.display = this._images[idx + 1];
    }
    else {
      this.display = this._images[0];
    }
  }

}
