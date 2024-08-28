import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INewCard, INewCardImage } from 'src/app/new-models/new-card';
import { INewPersonalize } from 'src/app/new-models/new-personalize';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

export interface IImage {
  title: string; 
  url: string;
}

@Component({
  selector: 'app-new-personalize',
  templateUrl: './new-personalize.component.html',
  styleUrls: ['./new-personalize.component.scss']
})
export class NewPersonalizeComponent implements OnInit {
  @Input() iPersonalize: INewPersonalize;

  activeModal: NgbActiveModal;
  cardService: NewCardService;
  storageService: NewStorageService;
  fileService: NewFileService;
  ref: ChangeDetectorRef;

  constructor(
    _activeModal: NgbActiveModal,
    _cardService: NewCardService,
    _storageService: NewStorageService,
    _fileService: NewFileService,
    _ref: ChangeDetectorRef
  ) { 
    this.activeModal = _activeModal;
    this.cardService = _cardService;
    this.storageService = _storageService;
    this.fileService = _fileService;
    this.ref = _ref;
  }

  iCard: INewCard;
  iImages: IImage[] = [];
  selected: IImage | undefined = undefined

  async ngOnInit(): Promise<void> {
    this.iCard = await this.cardService.get(this.iPersonalize.itemId);
    let images = await this.cardService.getImages(this.iPersonalize.itemId);
    for await (let image of images) {
      if (image.title === 'Front') {
        this.iImages.push({
          title: image.title,
          url: await this.fileService.getImageURL(image.url)
        })
      }
      if (image.title === 'Sign & Send') {
        this.iImages.push({
          title: image.title,
          url: await this.fileService.getImageURL(image.url)
        })
      }
      this.selected = this.iImages[0];
    }
    this.ref.detectChanges();
  }

  onClick(value: IImage) {
    this.selected = value
  }

  close(){
    this.activeModal.close();
  }

  onPrev(){
    let idx = this.iImages.findIndex(x => x === this.selected);
    if (idx !== 0) {
      this.selected = this.iImages[idx - 1];
    }
    else {
      this.selected = this.iImages[this.iImages.length - 1];
    }
  }

  onNext(){
    let idx = this.iImages.findIndex(x => x === this.selected);
    if (idx !== (this.iImages.length - 1)) {
      this.selected = this.iImages[idx + 1];
    }
    else {
      this.selected = this.iImages[0];
    }
  }

}
