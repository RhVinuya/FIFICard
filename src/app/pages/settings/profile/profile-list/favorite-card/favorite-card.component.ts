import { PriceService } from '../../../../../services/price.service';
import { ImageService } from 'src/app/services/image.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {
  @Input() card: Card;

  cardService: CardService;
  imageService: ImageService;
  priceService: PriceService;

  constructor(
    _cardService: CardService,
    _imageService: ImageService,
    _priceService: PriceService
  ) { 
    this.cardService = _cardService;
    this.imageService = _imageService;
    this.priceService = _priceService;
  }

  url: string;

  ngOnInit(): void {
    this.updateImage();
  }

  async updateImage() {
    if (this.card.type != 'ecard'){
      let images = await this.cardService.getImages(this.card.id!);
      if (images){
        this.url = await this.imageService.getImageURL(images[0].url);
      }
    }
    else{
      let ecardimages = await this.cardService.getECardImages(this.card.id!);
      let ecardimage = ecardimages.find(x => x.title == 'preview');
      this.url = await this.imageService.getImageURL(ecardimage!.url);
    }
  }

  getPrice(): number {
    let type: 'STANDARD' | 'GLITTERED' | 'EMBOSSED' = 'STANDARD'
    if (this.card!.types!.findIndex(x => x == 'STANDARD') >= 0) {
      type = 'STANDARD';
    }
    else if (this.card!.types!.findIndex(x => x == 'GLITTERED') >= 0) {
      type = 'GLITTERED';
    }
    if (this.card!.types!.findIndex(x => x == 'EMBOSSED') >= 0) {
      type = 'EMBOSSED';
    }
    return this.priceService.getPrice(this.card!, type)
  }

}
