import { Injectable } from '@angular/core';
import { doc, Firestore, getDocFromServer } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewUtilService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getType(id: string): Promise<'card' | 'sticker' | 'postcard'> {
    return new Promise((resolve) => {
      let data = doc(this.store, 'cards/' + id);
      getDocFromServer(data).then(doc => {
        if (doc.exists()) {
          let type = doc.data()['type'] as 'card' | 'sticker' | 'postcard';
          resolve(type);
        }
      })
    });
  }
}
