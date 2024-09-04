import { Component, OnInit } from '@angular/core';
import { LocationType } from 'src/app/new-models/new-enum';
import { NewLocationService } from 'src/app/new-services/new-location.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {

  locationService: NewLocationService;

  constructor(
    _locationService: NewLocationService
  ) { 
    this.locationService = _locationService;
  }

  location: LocationType = 'ph';

  ngOnInit(): void {
    this.location = this.locationService.getlocation();
  }

}
