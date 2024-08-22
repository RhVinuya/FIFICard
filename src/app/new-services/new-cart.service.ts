import { Injectable } from '@angular/core';
import { INewCart } from '../new-models/new-cart';
import { INewCard } from '../new-models/new-card';
import { INewSticker } from '../new-models/new-sticker';
import { NewStorageService } from './new-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewCartService {

  storageService: NewStorageService;

  constructor(
    _storageService: NewStorageService
  ) {
    this.storageService = _storageService;
  }

  getRandomString(): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < 20; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  add(cart: INewCart): Promise<string> {
    return new Promise((resolve) => {
      cart.id = this.getRandomString();
      let ids = this.storageService.getCartList();
      this.storageService.saveCart(cart);
      this.storageService.saveCartList([...ids, cart.id]);
      resolve(cart.id)
    });
  }
}
