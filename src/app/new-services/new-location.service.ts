import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type LocationType = 'ph' | 'us' | 'sg' ;

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

  getPriceSymbol(): string {
    let location: LocationType = this.getlocation();
    if (location === 'us') return '$'
    else if (location === 'sg') return 'S$'
    else return '₱'
  }

  getCurrency(): string {
    let location = this.getlocation();
    if (location === 'us') return 'USD'
    else if (location === 'sg') return 'SGD'
    else return 'PHP'
  }
}
