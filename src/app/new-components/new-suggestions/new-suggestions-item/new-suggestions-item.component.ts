import { Component, Input, OnInit } from '@angular/core';
import { INewCardImage, NewCard } from 'src/app/new-models/new-card';
import { INewGiftImage, NewGift } from 'src/app/new-models/new-gift';
import { NewPostcard } from 'src/app/new-models/new-postcard';
import { INewStickerImage, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-suggestions-item',
  templateUrl: './new-suggestions-item.component.html',
  styleUrls: ['./new-suggestions-item.component.scss']
})
export class NewSuggestionsItemComponent implements OnInit {
  @Input() model: NewCard | NewSticker | NewPostcard | NewGift;
  @Input() type: string;
  
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  imageUrl: string | null = null;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
  ) {
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
   }

  async ngOnInit(): Promise<void> {
  
    if (this.type === 'card') {
        await this.loadImages(await this.cardService.getImages(this.model.id));
    }
    else if (this.type === 'sticker') {
      await this.loadImages(await this.stickerService.getImages(this.model.id));
    }
    else if (this.type === 'postcard') {
      await this.loadImages(await this.postcardService.getImages(this.model.id));
    }
    else if (this.type === 'gift') {
      await this.loadImages(await this.giftService.getImages(this.model.id));
    }
  }

  getPrice() {
    if (this.type === 'card') return (this.model as NewCard).priceDisplay();
    else if (this.type === 'sticker') return (this.model as NewSticker).priceDisplay();
    else if (this.type === 'gift') return (this.model as NewGift).priceDisplay();
    else return '';
  }

  async loadImages(items: INewCardImage[] | INewStickerImage[] | INewGiftImage[]) {
      this.imageUrl = await this.fileService.getImageURL(items[0].url);
  }
}
