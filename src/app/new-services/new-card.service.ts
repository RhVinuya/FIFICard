import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocFromServer, getDocs, getDocsFromServer, query, where } from '@angular/fire/firestore';
import { INewCard, INewCardImage } from '../new-models/new-card';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewCardService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getAll(): Promise<INewCard[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('type', "==", 'card'))
      getDocs(q).then(docs => {
        let cards: INewCard[] = [];
        docs.forEach(doc => {
          let card: INewCard = doc.data() as INewCard;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  get(id: string): Promise<INewCard> {
    return new Promise((resolve) => {
      let data = doc(this.store, 'cards/' + id);
      getDocFromServer(data).then(doc => {
        if (doc.exists()) {
          let card: INewCard = doc.data() as INewCard;
          card.id = doc.id;
          resolve(card);
        }
      })
    });
  }

  getImages(id: string): Promise<INewCardImage[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + '/cardimages');
      const q = query(col, where('active', "==", true))
      getDocsFromServer(q).then(docs => {
        let images: INewCardImage[] = [];
        let temp: INewCardImage[] = [];
        
        docs.forEach(doc => {
          let image: INewCardImage = doc.data() as INewCardImage;
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
