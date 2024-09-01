import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes, UploadResult } from '@angular/fire/storage';
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

  private getRandomString(): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzZ0123456789';
    var result = '';
    for (var i = 0; i < 10; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
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

  uploadFile(file: File): Promise<UploadResult>{
    let id = this.getRandomString();
    const reference = ref(this.storage, 'payment-proof/' + id);
    return uploadBytes(reference, file);
  }
}
