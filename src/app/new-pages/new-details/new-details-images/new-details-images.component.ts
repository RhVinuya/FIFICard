import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-details-images',
  templateUrl: './new-details-images.component.html',
  styleUrls: ['./new-details-images.component.scss']
})
export class NewDetailsImagesComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<NewDetailsImagesComponent>;

  modalService: NgbModal;

  constructor(
    _modalService: NgbModal
  ) { 
    this.modalService = _modalService;
  }

  images: string[] = [
    "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/card%2FE33L7gYiAiEXx7YLKyAE%2FD93L9lFQT2kFheoXJkUr%2F1000023495.png?alt=media&token=e3d807d9-86a2-42e1-b093-ae94c7696f2e",
    "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/card%2FE33L7gYiAiEXx7YLKyAE%2FyKEDuPc8SQ99o440uxy3%2F1.png?alt=media&token=64737c57-3e85-448b-8a6c-7791fb55c5b6",
    "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/card%2FE33L7gYiAiEXx7YLKyAE%2FD0laiiY9glqo7d4TfKCb%2F1000023493.png?alt=media&token=adb45a5c-5215-499c-a293-95df7172ad34",
    "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/card%2FE33L7gYiAiEXx7YLKyAE%2FKpjMjvfaPsIknDjTEUy2%2F3.png?alt=media&token=1abe310d-6d35-49c9-922e-61dc385143c0",
    "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/card%2FE33L7gYiAiEXx7YLKyAE%2FRql2oAG8PLOJbTnnbvKM%2F1000020912.png?alt=media&token=ab3631bb-bd6f-4965-9624-9b134a09bb9d",
    "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/card%2FE33L7gYiAiEXx7YLKyAE%2FHhPWyY1AZSzhDYW37xNc%2F1000020916.png?alt=media&token=6115d139-5507-4905-b157-5c806b326287",
    "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/card%2FE33L7gYiAiEXx7YLKyAE%2FVXgu0xwQe7UJZsYk1A5f%2F1000020917.png?alt=media&token=b4e0db1b-ddd0-4500-936c-fca6741cfdb2"
  ];
  selected: string = '';
  display: string = '';
  modalRef: NgbModalRef;

  ngOnInit(): void {
    this.selected = this.images[0];
  }

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
    let idx = this.images.findIndex(x => x === this.display);
    if (idx !== 0) {
      this.display = this.images[idx - 1];
    }
    else {
      this.display = this.images[this.images.length - 1];
    }
  }

  onNext(){
    let idx = this.images.findIndex(x => x === this.display);
    if (idx !== (this.images.length - 1)) {
      this.display = this.images[idx + 1];
    }
    else {
      this.display = this.images[0];
    }
  }

}
