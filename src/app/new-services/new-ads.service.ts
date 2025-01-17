import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewAdsService {

  showSubject = new BehaviorSubject<boolean>(false);
  show$ = this.showSubject.asObservable();
  
  constructor() { }
}
