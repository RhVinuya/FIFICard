import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class NewFileService {
  storage: Storage;

  constructor(
    _storage: Storage
  ) {
    this.storage = _storage;
  }

  async getImageURL(path: string): Promise<string> {
    return new Promise(async resolve => {
      const fileRef = ref(this.storage, path);
      let value = await getDownloadURL(fileRef);
      resolve(value);
    })
  }
}
