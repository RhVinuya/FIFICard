import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { IModelType, LocationType } from 'src/app/new-models/new-enum';
import { INewGift } from 'src/app/new-models/new-gift';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

class Batch {
  public items: IModelType[]

  constructor(value: IModelType[]) {
    this.items = value;
  }
}

@Component({
  selector: 'app-new-recents',
  templateUrl: './new-recents.component.html',
  styleUrls: ['./new-recents.component.scss']
})
export class NewRecentsComponent {
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  @Input() set ids(value: string[]) {
    if (this.itemIds.join('') !== value.join('')) {
      this.itemIds = value;
      this.batches = this.loadItems();
    }
  }
  @Output() refresh: EventEmitter<void> = new EventEmitter();

  storageService: NewStorageService;
  locationService: NewLocationService;

  constructor(
    _storageService: NewStorageService,
    _locationService: NewLocationService
  ) {
    this.storageService = _storageService;
    this.locationService = _locationService;
  }

  itemIds: string[] = [];
  items: IModelType[] = [];
  batches: Batch[] = [];
  location: LocationType = 'ph';
  limit: number = 10;


  ngOnInit() {
    this.location = this.locationService.getlocation();
    let recents = this.storageService.getRecents();
    recents.forEach(recent => {
      let isActive: boolean = recent.active;
      let isAvailable: boolean = true
      if (recent.type === 'gift' && (recent as INewGift).locations !== undefined) {
        isAvailable = (recent as INewGift).locations.includes(this.location)
      }
      if (isActive && isAvailable) this.items = [...this.items, recent];
    })
    this.batches = this.loadItems();
  }

  loadItems() {
    let filtered = this.items.filter(x => this.itemIds.includes(x.id) === false);
    if (this.location !== 'ph') filtered = filtered.filter(x => x.type !== 'gift')

    let slides = Math.floor(filtered.length / 10) + (filtered.length % 10 !== 0 ? 1 : 0);

    let batches: Batch[] = [];
    let x: number;
    for (x = 1; x <= slides; x++) {
      let end: number = x * this.limit;
      let batch: Batch = new Batch(filtered.slice(end - this.limit, end));
      batches.push(batch);
    }

    return batches;
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
