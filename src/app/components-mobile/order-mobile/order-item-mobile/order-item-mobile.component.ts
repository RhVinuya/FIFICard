import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { INewCard, INewRating, NewCard, NewRating } from 'src/app/new-models/new-card';
import { LocationType, ModelType } from 'src/app/new-models/new-enum';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPaymentItem, NewPaymentItem } from 'src/app/new-models/new-payment';
import { INewPostcard, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewDetailsImagesComponent } from 'src/app/new-pages/new-details/new-details-images/new-details-images.component';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { INewUser } from 'src/app/new-models/new-user';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { IConfig } from 'src/app/new-models/new-config';
import { NewConfigService } from 'src/app/new-services/new-config.service';

@Component({
  selector: 'app-order-item-mobile',
  templateUrl: './order-item-mobile.component.html',
  styleUrls: ['./order-item-mobile.component.scss']
})
export class OrderItemMobileComponent implements OnInit {

  
  @ViewChild('newRating') modal: TemplateRef<OrderItemMobileComponent>;

  @Input() iItem: INewPaymentItem;
  @Input() location: LocationType;

  processing: boolean = false;
  submitted: boolean = false;
  rate: number = 1;
  user: INewUser | undefined;
  ratings: INewRating[] = [];
  reviewed: boolean = true;
  
  reviewForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    review: new FormControl<string>('', [Validators.required]),
    rate: new FormControl<number>(this.rate, [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  storageService: NewStorageService;
  modalService: NgbModal;
  modalRef: NgbModalRef;
  locationService: NewLocationService;
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _modalService: NgbModal,
    _storageService: NewStorageService,
    _locationService: NewLocationService,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.modalService = _modalService;
    this.storageService = _storageService;
    this.locationService = _locationService;
  }

  item: NewPaymentItem;
  model: ModelType | undefined = undefined;
  primary: string = '';
  bundleDetails: string = ''

  ngOnInit(): void {
    this.loadDetails();
  }

  async loadDetails() {
    this.config = await this.configService.get();

    this.user = this.storageService.getUser();

    this.item = new NewPaymentItem(this.iItem, this.location);
    if (this.iItem.type === 'card') {
      let iCard = await this.cardService.get(this.iItem.itemId);
      this.model = new NewCard(iCard as INewCard, this.config);
      this.ratings = await this.cardService.getUserRating(this.iItem.itemId, this.user!.id);
      let images = await this.cardService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'sticker') {
      let iSticker = await this.stickerService.get(this.iItem.itemId);
      this.model = new NewSticker(iSticker as INewSticker, this.config);
      this.ratings = await this.cardService.getUserRating(this.iItem.itemId, this.user!.id);
      let images = await this.stickerService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this.iItem.itemId);
      this.model = new NewPostcard(iPostcard as INewPostcard, this.config);
      this.ratings = await this.cardService.getUserRating(this.iItem.itemId, this.user!.id);
      if (this.iItem.bundle){
        this.bundleDetails = 'Bundle of ' + this.iItem.bundle.count.toLocaleString() + ' pcs'
      }
      let images = await this.postcardService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'gift') {
      let iGift = await this.giftService.get(this.iItem.itemId);
      this.model = new NewGift(iGift as INewGift, this.config);
      this.ratings = await this.cardService.getUserRating(this.iItem.itemId, this.user!.id);
      let images = await this.giftService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }

    this.reviewed = this.ratings.length > 0;
    
  }

  async loadImage(url: string) {
    this.primary = await this.fileService.getImageURL(url);
  }

  openNewReview() {
    this.modalRef = this.modalService.open(this.modal, { animation: true, centered: true });
  }

  onClose() {
    this.modalRef.close();
  }

  async submit() {
    this.submitted = true;
    if (this.reviewForm.invalid) return;
    this.processing = true;

    this.reviewForm.controls.title.setErrors(null);
    this.reviewForm.controls.review.setErrors(null);
    this.reviewForm.controls.rate.setErrors(null);

    let value: INewRating = this.reviewForm.value as INewRating;
    value.userId = this.user!.id;
    value.username = this.user?.firstname + " " + this.user?.lastname;
    await this.cardService.addRating(this.model!.id, value);

    this.modalRef.close();
  }
}
