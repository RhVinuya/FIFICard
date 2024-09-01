import { Injectable } from '@angular/core';
import { INewPersonalize } from '../new-models/new-personalize';
import { NewStorageService } from './new-storage.service';
import { StorageEnum } from '../new-models/new-enum';

@Injectable({
  providedIn: 'root'
})
export class NewPersonalizeService {
  storageService: NewStorageService;

  constructor(
    _storageService: NewStorageService
  ) { 
    this.storageService = _storageService;
  }

  private generateID(): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < 5; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  getAll(): Promise<INewPersonalize[]>{
    return new Promise((resolve) => { 
      let personalizes: INewPersonalize[] = [];
      let ids = this.storageService.getKeyIds(StorageEnum.Personalize)
      ids.forEach(id => {
        let personalize = this.storageService.getPersonalize(id);
        if (personalize) personalizes.push(personalize)
      })
      resolve(personalizes);
    });
  }

  getByCard(cardId: string): Promise<INewPersonalize | undefined> {
    return new Promise((resolve) => { 
      let ids = this.storageService.getKeyIds(StorageEnum.Personalize)
      ids.forEach(id => {
        let personalize = this.storageService.getPersonalize(id);
        if (personalize && personalize.itemId === cardId) resolve(personalize)
      })
      resolve(undefined);
    });
  }

  create(cardId: string): Promise<INewPersonalize>{
    return new Promise((resolve) => { 
      let personalize = {
        id: this.generateID(),
        itemId: cardId,
        data:[]
      }
      this.storageService.savePersonalize(personalize);
      resolve(personalize);
    });
  }

  save(personalize: INewPersonalize) {
    this.storageService.savePersonalize(personalize);
  }
}
