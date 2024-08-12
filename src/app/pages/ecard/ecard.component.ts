import { CardService } from 'src/app/services/card.service';
import { ImageService } from 'src/app/services/image.service';
import { Card } from 'src/app/models/card';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PriceService } from 'src/app/services/price.service';
import { ECardImage } from 'src/app/models/ecard-image';

@Component({
  selector: 'app-ecard',
  templateUrl: './ecard.component.html',
  styleUrls: ['./ecard.component.scss']
})
export class ECardComponent implements OnInit {
  @Input() card: Card;

  @Input() showRatings: boolean = true;

  service: CardService;
  imageService: ImageService;
  priceService: PriceService;
  def: ChangeDetectorRef;

  constructor(
    _imageService: ImageService,
    _service: CardService,
    _priceService: PriceService,
    _def: ChangeDetectorRef
  ) { 
    this.imageService = _imageService;
    this.service = _service;
    this.priceService = _priceService;
    this.def = _def;
  }

  ECardPreviewImage: ECardImage;
  image: string;

  ngOnInit(): void {
    this.loadImage();
  }

  loadImage(){
    this.service.getECardImages(this.card.id!).then(images => {
      this.ECardPreviewImage = images.find(x => x.title == 'preview')!;
      this.imageService.getImageURL(this.ECardPreviewImage.url).then(image => {
        this.image = image;
        this.def.detectChanges();
      })
    })
  }

}
