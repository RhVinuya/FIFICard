import { PriceService } from '../../../services/price.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-more-item',
  templateUrl: './add-more-item.component.html',
  styleUrls: ['./add-more-item.component.scss']
})
export class AddMoreItemComponent implements OnInit {
  @Input() card: Card;
  @Input() count: number;
  @Output() addMoreChange: EventEmitter<number> = new EventEmitter<number>();

  service: CardService;
  priceService: PriceService;
  imageService: ImageService;

  constructor(
    _service: CardService,
    _priceService: PriceService,
    _imageService: ImageService
  ) {
    this.service = _service;
    this.priceService = _priceService;
    this.imageService = _imageService;
  }


  imageURL: string = ''
  currentCount: number = 0;
  show: boolean = false;

  ngOnInit(): void {
    this.loadImage(this.card.id!);
  }

  loadImage(id: string) {
    this.service.getPrimaryImage(id).then(img => {
      this.getImage(img);
    });
  }

  getImage(image: string) {
    this.imageService.getImageURL(image).then(url => {
      this.imageURL = url;
    });
  }

  markItem() {
    if (this.currentCount == 0) {
      this.addCount();
    }
  }

  addCount() {
    this.currentCount++;
    this.addMoreChange.emit(this.currentCount);
  }

  lessCount() {
    this.currentCount--;
    this.addMoreChange.emit(this.currentCount);
  }

  hover() {
    this.show = true;
  }

  unhover() {
    this.show = false;
  }
}
