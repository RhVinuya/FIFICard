import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocFromServer, getDocs, getDocsFromServer, query, where } from '@angular/fire/firestore';
import { INewGift, INewGiftImage } from '../new-models/new-gift';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewGiftService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getAll(): Promise<INewGift[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('type', "==", 'gift'))
      getDocs(q).then(docs => {
        let gifts: INewGift[] = [];
        docs.forEach(doc => {
          let gift: INewGift = doc.data() as INewGift;
          gift.id = doc.id;
          gifts.push(gift);
        })
        resolve(gifts);
      })
    });
  }

  get(id: string): Promise<INewGift> {
    return new Promise((resolve) => {
      let data = doc(this.store, 'cards/' + id);
      getDocFromServer(data).then(doc => {
        if (doc.exists()) {
          let gift: INewGift = doc.data() as INewGift;
          gift.id = doc.id;
          resolve(gift);
        }
      })
    });
  }

  getImages(id: string): Promise<INewGiftImage[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + '/cardimages');
      const q = query(col, where('active', "==", true))
      getDocsFromServer(q).then(docs => {
        let images: INewGiftImage[] = [];
        let temp: INewGiftImage[] = [];
        
        docs.forEach(doc => {
          let image: INewGiftImage = doc.data() as INewGiftImage;
          temp.push(image);
        });

        environment.imagetitles.forEach(title => {
          let image = temp.find(x => x.title === title);
          if (image) images.push(image)
        })
        
        resolve(images);
      })
    });
  }
}
