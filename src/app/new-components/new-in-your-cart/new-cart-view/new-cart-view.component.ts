import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INewCart } from 'src/app/new-models/new-cart';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-cart-view',
  templateUrl: './new-cart-view.component.html',
  styleUrls: ['./new-cart-view.component.scss']
})
export class NewCartViewComponent implements OnInit {
  @Input() cart: INewCart;
  @Output() delete: EventEmitter<string> = new EventEmitter();

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  fileService: NewFileService;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _fileService: NewFileService
  ) { 
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.fileService = _fileService
  }

  image: string = '';
  name: string = '';
  description: string = '';
  price: string = '';
  bundle: string = '';

  async ngOnInit(): Promise<void> {
    if (this.cart.type === 'card') {
      let iCard = await this.cardService.get(this.cart.itemid);
      if (iCard) {
        this.name = iCard.name;
        this.description = iCard.description;
        this.price = '₱' + this.cart.price.toLocaleString('en-US', { minimumFractionDigits: 2 });
        let images = await this.cardService.getImages(this.cart.itemid);
        if (images.length > 0) {
          this.fileService.getImageURL(images[0].url).then(value => this.image = value)
        }
      }
    }
    if (this.cart.type === 'sticker') {
      let iSticker = await this.stickerService.get(this.cart.itemid);
      if (iSticker) {
        this.name = iSticker.name;
        this.description = iSticker.description;
        this.price = '₱' + this.cart.price.toLocaleString('en-US', { minimumFractionDigits: 2 });
        let images = await this.stickerService.getImages(this.cart.itemid);
        if (images.length > 0) {
          this.fileService.getImageURL(images[0].url).then(value => this.image = value)
        }
      }
    }
    if (this.cart.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this.cart.itemid);
      if (iPostcard) {
        this.name = iPostcard.name;
        this.description = iPostcard.description;
        if (this.cart.bundle !== undefined) this.bundle = 'Bundle of ' + this.cart.bundle.count.toLocaleString() + ' pcs for ' + '₱' + this.cart.bundle.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
        let images = await this.postcardService.getImages(this.cart.itemid);
        if (images.length > 0) {
          this.fileService.getImageURL(images[0].url).then(value => this.image = value)
        }
      }
    }
  }

  onDelete() {
    this.delete.emit(this.cart.id)
  }

}
