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
import { NewInfoMessageComponent } from '../../new-info-message/new-info-message.component';

@Component({
  selector: 'app-new-order-item',
  templateUrl: './new-order-item.component.html',
  styleUrls: ['./new-order-item.component.scss']
})
export class NewOrderItemComponent implements OnInit {

  
  @ViewChild('newRating') modal: TemplateRef<NewOrderItemComponent>;

  @Input() iItem: INewPaymentItem;
  @Input() location: LocationType;

  submitted: boolean = false;
  rate: number = 0;
  
  reviewForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    review: new FormControl<string>('', [Validators.required]),
    rate: new FormControl<number>(this.rate, [Validators.required]),
  });

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  storageService: NewStorageService;
  modalService: NgbModal;
  modalRef: NgbModalRef;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _modalService: NgbModal,
    _storageService: NewStorageService,
  ) { 
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.modalService = _modalService;
    this.storageService = _storageService;
  }

  item: NewPaymentItem;
  model: ModelType | undefined = undefined;
  primary: string = '';
  bundleDetails: string = ''

  ngOnInit(): void {
    this.loadDetails();
  }

  async loadDetails() {
    this.item = new NewPaymentItem(this.iItem, this.location);
    if (this.iItem.type === 'card') {
      let iCard = await this.cardService.get(this.iItem.itemId);
      this.model = new NewCard(iCard as INewCard);
      let images = await this.cardService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'sticker') {
      let iSticker = await this.stickerService.get(this.iItem.itemId);
      this.model = new NewSticker(iSticker as INewSticker);
      let images = await this.stickerService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this.iItem.itemId);
      this.model = new NewPostcard(iPostcard as INewPostcard);
      if (this.iItem.bundle){
        this.bundleDetails = 'Bundle of ' + this.iItem.bundle.count.toLocaleString() + ' pcs'
      }
      let images = await this.postcardService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'gift') {
      let iGift = await this.giftService.get(this.iItem.itemId);
      this.model = new NewGift(iGift as INewGift);
      let images = await this.giftService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
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
    let user = this.storageService.getUser();
    let value: INewRating = this.reviewForm.value as INewRating;
    value.username = user?.firstname + " " + user?.lastname;
    await this.cardService.addRating(this.model!.id, value);

    this.modalRef.close();
    const reference = this.modalService.open(NewInfoMessageComponent, { animation: true });
    reference.componentInstance.title = "SUCCESSFULL";
    reference.componentInstance.message = "Review's successfully submitted.";
    reference.componentInstance.button = "CONTINUE";
    reference.componentInstance.onContinue.subscribe((value: any) => {
      reference.close();
    })
  }
}
