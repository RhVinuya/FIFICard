import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INewCart } from 'src/app/new-models/new-cart';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
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
  fileService: NewFileService;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _fileService: NewFileService
  ) { 
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.fileService = _fileService
  }

  image: string = '';
  name: string = '';
  description: string = '';
  price: string = '';

  async ngOnInit(): Promise<void> {
    if (this.cart.type === 'card') {
      let iCard = await this.cardService.get(this.cart.itemid);
      if (iCard) {
        this.name = iCard.name;
        this.description = iCard.description;
        this.price = '₱' + iCard.price.toLocaleString('en-US', { minimumFractionDigits: 2 });
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
        this.price = '₱' + iSticker.price.toLocaleString('en-US', { minimumFractionDigits: 2 });
        let images = await this.stickerService.getImages(this.cart.itemid);
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
