import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewPersonalizeService {

  constructor() { }

  generateID(): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < 5; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
