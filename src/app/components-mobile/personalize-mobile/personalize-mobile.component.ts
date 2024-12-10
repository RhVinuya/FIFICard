import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INewCard } from 'src/app/new-models/new-card';
import { INewPersonalize, INewPersonalizeData } from 'src/app/new-models/new-personalize';
import { IImage } from 'src/app/new-pages/new-personalize/new-personalize.component';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-personalize-mobile',
  templateUrl: './personalize-mobile.component.html',
  styleUrls: ['./personalize-mobile.component.scss']
})
export class PersonalizeMobileComponent implements OnInit {

  @Input() iPersonalize: INewPersonalize;
  @Output() added: EventEmitter<boolean> = new EventEmitter()

  text: string;
  placeholder: string = 'Add your greetings/message';
  font: string;
  color: string;
  size: number;
  alignment: 'left' | 'center' | 'right';
  isDisplay: boolean = false;


  activeModal: NgbActiveModal;
  personalizeService: NewPersonalizeService;
  cardService: NewCardService;
  storageService: NewStorageService;
  cartService: NewCartService;
  fileService: NewFileService;
  ref: ChangeDetectorRef;

  iCard: INewCard;
  iImages: IImage[] = [];
  personalizeData: INewPersonalizeData[] = [];
  selected: IImage | undefined = undefined;
  loading: boolean = false;
  isProcessing: boolean = false;

  constructor(
    _activeModal: NgbActiveModal,
    _personalizeService: NewPersonalizeService,
    _cardService: NewCardService,
    _storageService: NewStorageService,
    _cartService: NewCartService,
    _fileService: NewFileService,
    _ref: ChangeDetectorRef,
    _popoverController: PopoverController
  ) {
    this.activeModal = _activeModal;
    this.personalizeService = _personalizeService;
    this.cardService = _cardService;
    this.cartService = _cartService;
    this.storageService = _storageService;
    this.fileService = _fileService;
    this.ref = _ref; 
  }

  async ngOnInit(): Promise<void> {
    console.log("PersonalizeMobileComponent");
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
        console.log("PersonalizeMobileComponent");
        console.log(signAndSend);
        console.log(this.personalizeData);
      }

      this.iPersonalize.data = this.personalizeData;
      this.personalizeService.save(this.iPersonalize);
    
    } else {
    
      this.personalizeData = this.iPersonalize.data;
      console.log(this.personalizeData);
    }

    this.personalizeData.forEach(data => {
      this.iImages.push({
        title: 'Sign and Send',
        url: data.url
      })
    })

    if (this.iImages.length > 0) this.selected = this.iImages[0];

    this.loading = false;
  }

  getToppx(px: number) {
    return px / -0.45;
  }
}
