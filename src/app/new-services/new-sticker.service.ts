import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocFromServer, getDocs, getDocsFromServer, orderBy, query, where } from '@angular/fire/firestore';
import { INewSticker, INewStickerImage } from '../new-models/new-sticker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewStickerService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getAll(): Promise<INewSticker[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('type', "==", 'sticker'), orderBy('price'))
      getDocs(q).then(docs => {
        let stickers: INewSticker[] = [];
        docs.forEach(doc => {
          let sticker: INewSticker = doc.data() as INewSticker;
          sticker.id = doc.id;
          stickers.push(sticker);
        })
        resolve(stickers);
      })
    });
  }

  get(id: string): Promise<INewSticker> {
    return new Promise((resolve) => {
      let data = doc(this.store, 'cards/' + id);
      getDocFromServer(data).then(doc => {
        if (doc.exists()) {
          let sticker: INewSticker = doc.data() as INewSticker;
          sticker.id = doc.id;
          resolve(sticker);
        }
      })
    });
  }

  getImages(id: string): Promise<INewStickerImage[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + '/cardimages');
      const q = query(col, where('active', "==", true))
      getDocsFromServer(q).then(docs => {
        let images: INewStickerImage[] = [];
        let temp: INewStickerImage[] = [];
        
        docs.forEach(doc => {
          let image: INewStickerImage = doc.data() as INewStickerImage;
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