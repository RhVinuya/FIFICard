import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { IModelType, ItemType } from 'src/app/new-models/new-enum';
import { LocationType } from 'src/app/new-models/type';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

class Batch {
  public items: IModelType[]

  constructor(value: IModelType[]) {
    this.items = value;
  }
}

@Component({
  selector: 'app-new-promo-suggestions',
  templateUrl: './new-promo-suggestions.component.html',
  styleUrls: ['./new-promo-suggestions.component.scss']
})
export class NewPromoSuggestionsComponent {
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  @Input() set title(value: string) {
    this.text = value;
  }
  @Input() set visible(value: boolean) {
    this.show = value;
  }
  @Input() set ids(value: string[]) {
    this.itemIds = value;
  }
  @Input() set type(value: ItemType) {
    this.selectedType = value;
    this.load();
  }
  @Output() refresh: EventEmitter<void> = new EventEmitter();

  locationService: NewLocationService;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;

  constructor(
    _locationService: NewLocationService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService
  ) {
    this.locationService = _locationService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
  }

  text: string = '';
  show: boolean = false;
  location: LocationType = 'ph';
  itemIds: string[] = [];
  selectedType: ItemType | undefined;
  items: IModelType[] = [];
  batches: Batch[] = [];
  loading: boolean = false;
  limit: number = 10;

  ngOnInit() { 
    this.location = this.locationService.getlocation()
  }

  async load() {
    if (this.selectedType === undefined) {
      return;
    }

    this.loading = true;

    if (this.selectedType === 'card') {
      this.items = (await this.cardService.getAll()).filter(x => x.cardbundle === false).filter(x => this.itemIds.includes(x.id) === false).slice(0, 30)
    }

    let slides = Math.floor(this.items.length / 10) + (this.items.length % 10 !== 0 ? 1 : 0);

    let x: number;
    for (x = 1; x <= slides; x++) {
      let end: number = x * this.limit;
      let batch: Batch = new Batch(this.items.slice(end - this.limit, end));
      this.batches.push(batch);
    }

    this.loading = false;
  }

  onAdd(item: IModelType) {
    this.items = [...this.items.filter(x => x.id !== item.id)];
    this.refresh.emit();
  }

  onPrev() {
    this.carousel.prev();
  }

  onNext() {
    this.carousel.next();
  }
}
