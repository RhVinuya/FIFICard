import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocFromServer, getDocs, getDocsFromServer, query, where, limit } from '@angular/fire/firestore';
import { INewGift, INewGiftImage, NewGift } from '../new-models/new-gift';
import { environment } from 'src/environments/environment';
import { NewStorageService } from './new-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewGiftService {
  store: Firestore;
  storageService: NewStorageService;

  constructor(
    _store: Firestore,
    _storageService: NewStorageService
  ) {
    this.store = _store;
    this.storageService = _storageService;
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
  
  getByEvent(event: string): Promise <INewGift[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, 
        where('active', "==", true), 
        where('type', "==", 'gift'), 
        where('events', "array-contains", event),
        limit(31)
      )

      getDocs(q).then(docs => {
        let gifts: INewGift[] = [];
        docs.forEach(doc => {
          let gift: INewGift = doc.data() as  INewGift;
          gift.id = doc.id;
          gifts.push(gift);
        })
        resolve(gifts);
      })
    });
  }


  get(id: string): Promise<INewGift> {
    return new Promise((resolve) => {
      let gift = this.storageService.getItemDetails(id)
      if (gift) resolve(gift as INewGift)
      else {
        let data = doc(this.store, 'cards/' + id);
        getDocFromServer(data).then(doc => {
          if (doc.exists()) {
            let gift: INewGift = doc.data() as INewGift;
            gift.id = doc.id;
            resolve(gift);
          }
        })
      }
    });
  }

  getImages(id: string, isGallery: boolean = false): Promise<INewGiftImage[]> {
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

        if (isGallery === false) {
          environment.imagetitles.forEach(title => {
            let image = temp.find(x => x.title === title);
            if (image) images.push(image)
          })
        }
        else {
          environment.gallerytitles.forEach(title => {
            let image = temp.find(x => x.title === title);
            if (image) images.push(image)
          })
        }    

        resolve(images);
      })
    });
  }
}
