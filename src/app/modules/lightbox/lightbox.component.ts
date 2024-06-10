import { LightboxImage } from './lightbox-image';
import { Component, Input, OnInit, Renderer2, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {
  @Input() set images(_images: LightboxImage[]) {
    this.loadImages(_images);
  }
  @Input() set title(_title: string) {
    this.cardtitle = _title;
  }
  @ViewChild('modal', { static: true }) modal: TemplateRef<LightboxComponent>;

  modalService: NgbModal;
  modalRef: NgbModalRef;
  renderer: Renderer2;
  globalListenFunc: Function;

  constructor(
    _modalService: NgbModal,
    _renderer: Renderer2
  ) {
    this.modalService = _modalService;
    this.renderer = _renderer;
  }

  items: LightboxImage[] = [];
  current: LightboxImage = new LightboxImage(0, '', '');
  cardtitle: string;
  imagedivstyle: string = "height: 100%; width: 100%;";
  floaterwidth: number = 45;

  ngOnInit(): void {
    this.globalListenFunc = this.renderer.listen('document', 'keydown', e => {
      if (e.key == 'ArrowLeft') {
        this.prev();
      }
      if (e.key == 'ArrowRight') {
        this.next();
      }
    });
  }

  loadImages(_images: LightboxImage[]) {
    this.items = _images;
  }

  open(_id: number) {
    this.change(_id);
    this.modalRef = this.modalService.open(this.modal, { animation: true, fullscreen: true });
  }

  change(_id: number) {
    this.imagedivstyle = "height: 100%; width: 100%";
    this.current = this.items[_id];
  }

  prev() {
    let id = this.current.id - 1;
    if (id == -1) {
      id = this.items.length - 1;
    }
    this.imagedivstyle = "height: 100%; width: 100%";
    this.current = this.items[this.items.findIndex(x => x.id == id)];
  }

  next() {
    let id = this.current.id + 1;
    if (id > this.items.length-1) {
      id = 0;
    }
    this.imagedivstyle = "height: 100%; width: 100%";
    this.current = this.items[this.items.findIndex(x => x.id == id)];
  }

  close() {
    this.modalRef.close();
  }

  configureParent() {
    let preview: HTMLElement | null = document.getElementById('img');
    if(preview !== null) {
      this.imagedivstyle = "height: " + preview.clientHeight + "px; width: "+ preview.clientWidth + "px;";
      if (preview.clientHeight > preview.clientWidth) {
        this.floaterwidth = 70;
      }
      else {
        this.floaterwidth = 45;
      }
    }
  }
}
