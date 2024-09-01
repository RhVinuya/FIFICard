import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INewCard } from 'src/app/new-models/new-card';
import { INewPersonalize, INewPersonalizeData, INewPersonalizeDetail } from 'src/app/new-models/new-personalize';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';
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
  personalizeService: NewPersonalizeService;
  cardService: NewCardService;
  storageService: NewStorageService;
  fileService: NewFileService;
  ref: ChangeDetectorRef;

  constructor(
    _activeModal: NgbActiveModal,
    _personalizeService: NewPersonalizeService,
    _cardService: NewCardService,
    _storageService: NewStorageService,
    _fileService: NewFileService,
    _ref: ChangeDetectorRef
  ) {
    this.activeModal = _activeModal;
    this.personalizeService = _personalizeService;
    this.cardService = _cardService;
    this.storageService = _storageService;
    this.fileService = _fileService;
    this.ref = _ref;
  }

  iCard: INewCard;
  iImages: IImage[] = [];
  personalizeData: INewPersonalizeData[] = [];
  selected: IImage | undefined = undefined;
  loading: boolean = false;

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.iCard = await this.cardService.get(this.iPersonalize.itemId);

    let images = await this.cardService.getImages(this.iPersonalize.itemId);
    let idx = images.findIndex(x => x.title === 'Front');
    if (idx >= 0) {
      this.iImages.push({
        title: "Primary",
        url: await this.fileService.getImageURL(images[idx].url)
      })
    }

    if (this.iPersonalize.data.length === 0) {    
      let signAndSends = await this.cardService.getSignAndSend(this.iPersonalize.itemId);
      for await (let signAndSend of signAndSends) {
        let idx = this.personalizeData.findIndex(x => x.image === signAndSend.image);
        if (idx < 0) {
          let url = await this.fileService.getImageURL(signAndSend.image);
          this.personalizeData.push({
            image: signAndSend.image,
            url: url,
            details: [{
              id: signAndSend.id,
              code: signAndSend.code,
              height: signAndSend.height,
              width: signAndSend.width,
              top: signAndSend.top,
              left: signAndSend.left,
              text: '',
              font: 'Open Sans',
              color: '#000000',
              size: 18,
              alignment: 'left'
            }]
          })
        }
        else {
          this.personalizeData[idx].details.push({
            id: signAndSend.id,
            code: signAndSend.code,
            height: signAndSend.height,
            width: signAndSend.width,
            top: signAndSend.top,
            left: signAndSend.left,
            text: '',
            font: 'Open Sans',
            color: '#000000',
            size: 18,
            alignment: 'left'
          })
        }
      }
      this.iPersonalize.data = this.personalizeData;
      this.personalizeService.save(this.iPersonalize);
    }
    else {
      this.personalizeData = this.iPersonalize.data;
    }

    this.personalizeData.forEach(data => {
      this.iImages.push({
        title: 'Sign and Send',
        url: data.url
      })
    })

    if (this.iImages.length > 0) this.selected = this.iImages[0];
    this.ref.detectChanges();
    this.loading = false;
  }

  onClick(value: IImage) {
    this.selected = value
  }

  close() {
    this.activeModal.close();
  }

  onPrev() {
    let idx = this.iImages.findIndex(x => x === this.selected);
    if (idx !== 0) {
      this.selected = this.iImages[idx - 1];
    }
    else {
      this.selected = this.iImages[this.iImages.length - 1];
    }
  }

  onNext() {
    let idx = this.iImages.findIndex(x => x === this.selected);
    if (idx !== (this.iImages.length - 1)) {
      this.selected = this.iImages[idx + 1];
    }
    else {
      this.selected = this.iImages[0];
    }
  }

  getSignAndSendDetails(url: string): INewPersonalizeDetail[] {
    let idx = this.personalizeData.findIndex(x => x.url === url)
    if (idx >= 0) return this.personalizeData[idx].details;
    else return []
  }

  changeTextarea(detail: INewPersonalizeDetail) {
    this.personalizeData.forEach(data => {
      let idx = data.details.findIndex(x => x.id === detail.id);
      data.details[idx] = detail;
    })
    this.iPersonalize.data = this.personalizeData
    this.personalizeService.save(this.iPersonalize);
  }
}
