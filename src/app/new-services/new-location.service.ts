import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocationType } from '../new-models/new-enum';

@Injectable({
  providedIn: 'root'
})

export class NewLocationService {

  constructor() {
  }

  getlocation(): LocationType {
    if (environment.us.findIndex(x => x == window.location.hostname.toLowerCase()) >= 0) {
      return 'us'
    }
    else if (environment.sg.findIndex(x => x == window.location.hostname.toLowerCase()) >= 0) {
      return 'sg'
    }
    else {
      return 'ph'
    }
  }

  getLogo(): string {
    let location = this.getlocation();
    if (location === 'us') return '/assets/images/logo_fibeigreetings-us.png'
    else if (location === 'sg') return '/assets/images/logo_fibeigreetings-sg.png'
    else return '/assets/images/logo_fibeigreetings-com.png'
  }

  getSymbol(value: LocationType) {
    if (value === 'us') return '$'
    else if (value === 'sg') return 'S$'
    else return '₱'
  }

  getCurrencySymbol(value: LocationType) {
    if (value === 'us') return 'USD'
    else if (value === 'sg') return 'SGD'
    else return 'PHP'
  }

  getPriceSymbol(): string {
    let location: LocationType = this.getlocation();
    return this.getSymbol(location)
  }

  getCurrency(): string {
    let location = this.getlocation();
    return this.getCurrencySymbol(location)
  }
}
