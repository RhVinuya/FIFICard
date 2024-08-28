import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { NewStorageService } from './new-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewFileService {
  storageService: NewStorageService;
  storage: Storage;

  constructor(
    _storageService: NewStorageService,
    _storage: Storage
  ) {
    this.storageService = _storageService;
    this.storage = _storage;
  }

  async getImageURL(path: string): Promise<string> {
    return new Promise(async resolve => {
      let id = path.replaceAll('/', '-');
      let url = this.storageService.getImageURL(id);
      if (url !== '') resolve(url)
      else {
        const fileRef = ref(this.storage, path);
        let value = await getDownloadURL(fileRef);
        this.storageService.saveImageURL(id, value);
        resolve(value);
      }
    })
  }
}
