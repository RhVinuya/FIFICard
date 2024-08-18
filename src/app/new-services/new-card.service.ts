import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocFromServer, getDocsFromServer, query, where } from '@angular/fire/firestore';
import { INewCard } from '../new-models/new-card';

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
      getDocsFromServer(q).then(docs => {
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
}
