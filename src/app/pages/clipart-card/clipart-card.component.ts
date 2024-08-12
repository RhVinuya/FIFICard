import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ImageService } from 'src/app/services/image.service';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-clipart-card',
  templateUrl: './clipart-card.component.html',
  styleUrls: ['./clipart-card.component.scss']
})
export class ClipartCardComponent implements OnInit {
  @Input() clipart: Card;

  imageService: ImageService;
  priceService: PriceService;

  constructor(
    _imageService: ImageService,
    _priceService: PriceService
  ) {
    this.imageService = _imageService;
    this.priceService = _priceService
  }

  image: string = '';

  ngOnInit(): void {
    this.loadimage();
  }

  loadimage() {
    if (this.clipart.primary) {
      this.imageService.getImageURL(this.clipart.primary).then(url => {
        this.image = url;
      });
    }
  }

  getPrice(): number {
    if (this.priceService.getLocation() == 'us'){
      return Number(this.clipart.usprice);
    }
    else if (this.priceService.getLocation() == 'sg'){
      return Number(this.clipart.sgprice);
    }
    return Number(this.clipart.price);
  }
}
