import { Injectable } from '@angular/core';
import { NewStorageService } from './new-storage.service';
import { NewAccountService } from './new-account.service';

@Injectable({
  providedIn: 'root'
})
export class NewWishlistService {

  storageService: NewStorageService;
  accountService: NewAccountService;

  constructor(
    _storageService: NewStorageService,
    _accountService: NewAccountService
  ) { 
    this.storageService = _storageService;
    this.accountService = _accountService;
  }

  get(): string[] {
    return this.storageService.getWishist()
  }

  save(ids: string[]) {
    this.storageService.saveWishlist(ids);
    let user = this.storageService.getUser();
    if (user) this.accountService.updateWishlist(user.id, ids)
  }

  clear() {
    this.storageService.clearWishlist();
  }
}
