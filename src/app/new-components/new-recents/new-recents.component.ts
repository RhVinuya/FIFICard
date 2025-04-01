import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { IModelType, LocationType } from 'src/app/new-models/new-enum';
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
    this.itemIds = value;
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
  location: LocationType = 'ph';
  limit: number = 10;


  ngOnInit() {
    this.location = this.locationService.getlocation()
    this.items = this.storageService.getRecents();
  }

  getItems() {
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
