import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocationType } from 'src/app/new-models/new-enum';
import { NewLocationService } from 'src/app/new-services/new-location.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {

  isMobile: boolean = false;
  platform: Platform;
  locationService: NewLocationService;

  constructor(
    _platform: Platform,
    _locationService: NewLocationService
  ) { 
    this.platform = _platform;
    this.locationService = _locationService;
  }

  location: LocationType = 'ph';

  ngOnInit(): void {
    this.isMobile =
      this.platform.is("capacitor") || this.platform.is("mobileweb");

    console.log(this.isMobile);
    this.location = this.locationService.getlocation();
  }

}
