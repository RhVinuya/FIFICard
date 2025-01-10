import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocationType } from 'src/app/new-models/new-enum';
import { NewLocationService } from 'src/app/new-services/new-location.service';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  locationService: NewLocationService;

  constructor(
    _locationService: NewLocationService,
    config: NgbCarouselConfig
  ) { 
    this.locationService = _locationService;

    config.interval = 10000;
    config.wrap = true;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.animation = true;
  }

  location: LocationType;
  showHeader: boolean = false;

  ngOnInit(): void { 
    this.location = this.locationService.getlocation();
  }

  onPrev() {
    this.carousel.prev();
  }

  onNext() {
    this.carousel.next();
  }
}
