import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NgbActiveModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { IConfig } from 'src/app/new-models/new-config';
import { INewPersonalize, INewPersonalizeData, INewPersonalizeDetail } from 'src/app/new-models/new-personalize';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
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
  @ViewChild('next', { static: false }) public next!: NgbPopover;
  @ViewChild('primary', { static: false }) public primary!: NgbPopover;
  @ViewChild('purpose', { static: false }) public purpose!: NgbPopover;

  @Input() iPersonalize: INewPersonalize;
  @Output() added: EventEmitter<boolean> = new EventEmitter()

  activeModal: NgbActiveModal;
  personalizeService: NewPersonalizeService;
  cardService: NewCardService;
  storageService: NewStorageService;
  cartService: NewCartService;
  fileService: NewFileService;
  ref: ChangeDetectorRef;
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _activeModal: NgbActiveModal,
    _personalizeService: NewPersonalizeService,
    _cardService: NewCardService,
    _storageService: NewStorageService,
    _cartService: NewCartService,
    _fileService: NewFileService,
    _ref: ChangeDetectorRef,
    _popoverController: PopoverController,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.activeModal = _activeModal;
    this.personalizeService = _personalizeService;
    this.cardService = _cardService;
    this.cartService = _cartService;
    this.storageService = _storageService;
    this.fileService = _fileService;
    this.ref = _ref;
  }

  iCard: INewCard;
  iImages: IImage[] = [];
  personalizeData: INewPersonalizeData[] = [];
  selected: IImage | undefined = undefined;
  loading: boolean = false;
  isProcessing: boolean = false;

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
              alignment: 'center'
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
            alignment: 'center'
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

    if (!this.next.isOpen()) {
      this.next.open();
    }

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
      if (this.next.isOpen()) {
        this.next.close();
      }
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

  onAddToCart() {
    let card: NewCard = new NewCard(this.iCard, this.config);
    this.isProcessing = true;
    this.cartService.add({
      id: '',
      itemId: this.iPersonalize.itemId,
      userId: '',
      price: card.getPersonalizePHPrice(),
      sgprice: card.getPersonalizeSGPrice(),
      usprice: card.getPersonalizeUSPrice(),
      type: 'card',
      bundle: undefined,
      personalize: this.iPersonalize,
      mark: true
    });
    this.isProcessing = false;
    this.added.emit(true);
  }

  loaded(){
    if (!this.primary.isOpen()) {
      this.primary.open();
    }

    if (!this.purpose.isOpen()) {
      this.purpose.open();
    }
  }
}
