import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewConfirmMessageComponent } from 'src/app/new-components/new-confirm-message/new-confirm-message.component';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { INewCart } from 'src/app/new-models/new-cart';
import { INewPostcard, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-cart-item',
  templateUrl: './new-cart-item.component.html',
  styleUrls: ['./new-cart-item.component.scss']
})
export class NewCartItemComponent implements OnInit {
  @Input() set cart(value: INewCart) {
    this.loadDetails(value);
  }
  @Output() onChangeMark: EventEmitter<boolean> = new EventEmitter()
  @Output() onRemoveItem: EventEmitter<string> = new EventEmitter()

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  fileService: NewFileService;
  modalService: NgbModal;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _fileService: NewFileService,
    _modalService: NgbModal
  ) {
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.fileService = _fileService;
    this.modalService = _modalService;
  }

  model: NewCard | NewSticker | NewPostcard | undefined = undefined;
  iCart: INewCart | undefined = undefined;
  primary: string = '';
  bundleDetails: string = ''

  ngOnInit() {

  }

  async loadDetails(cart: INewCart) {
    this.iCart = cart
    if (this.iCart.type === 'card') {
      let iCard = await this.cardService.get(this.iCart.itemid);
      this.model = new NewCard(iCard as INewCard);
      let images = await this.cardService.getImages(this.iCart.itemid);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iCart.type === 'sticker') {
      let iSticker = await this.stickerService.get(this.iCart.itemid);
      this.model = new NewSticker(iSticker as INewSticker);
      let images = await this.stickerService.getImages(this.iCart.itemid);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iCart.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this.iCart.itemid);
      this.model = new NewPostcard(iPostcard as INewPostcard);
      if (this.iCart.bundle){
        this.bundleDetails = 'Bundle of ' + this.iCart.bundle.count.toLocaleString() + ' pcs'
      }
      let images = await this.postcardService.getImages(this.iCart.itemid);
      if (images.length > 0) this.loadImage(images[0].url)
    }
  }

  async loadImage(url: string) {
    this.primary = await this.fileService.getImageURL(url);
  }

  getAmount() {
    if (this.iCart) {
      if (this.iCart.type === 'postcard') {
        if (this.iCart.bundle) return this.iCart.bundle.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return this.iCart.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
      }
      else return '₱ ' + this.iCart.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
    return '';
  }

  onChange(e: any) {
    this.onChangeMark.emit(e.target.checked);
  }

  onRemove() {
    const reference = this.modalService.open(NewConfirmMessageComponent, { animation: true });
    reference.componentInstance.title = 'Remove';
    reference.componentInstance.message = "Are you sure to remove?";
    reference.componentInstance.yes = 'YES';
    reference.componentInstance.no = 'NO';
    let resultSubs = reference.componentInstance.result.subscribe((value: any) => {
      if (this.iCart !== undefined && value) {
        this.onRemoveItem.emit(this.iCart.id)
      }
      reference.close();
      resultSubs.unsubscribe();
    })
  }
}
