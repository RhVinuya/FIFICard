import { Component, OnInit } from '@angular/core';
import { LocationType, NewLocationService } from 'src/app/new-services/new-location.service';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {

  locationService: NewLocationService;

  constructor(
    _locationService: NewLocationService
  ) { 
    this.locationService = _locationService;
  }

  location: LocationType;
  showHeader: boolean = false;

  ngOnInit(): void { 
    this.location = this.locationService.getlocation();
  }

}
