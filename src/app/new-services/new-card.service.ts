import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocFromServer, getDocs, getDocsFromServer, query, where, limit, getDoc, orderBy, addDoc, serverTimestamp   } from '@angular/fire/firestore';
import { INewCard, INewCardImage, INewRating, INewSignAndSend, NewCard, NewRating } from '../new-models/new-card';
import { environment } from 'src/environments/environment';
import { NewStorageService } from './new-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewCardService {
  store: Firestore;
  storageService: NewStorageService;

  constructor(
    _store: Firestore,
    _storageService: NewStorageService
  ) {
    this.store = _store;
    this.storageService = _storageService;
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

  getByEvent(event: string, signAndSend: boolean, messagetype: 'regular' | 'poetry'): Promise<INewCard[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, 
        where('active', "==", true), 
        where('type', "==", 'card'), 
        where('events', "array-contains", event),
        where('signAndSend', '==', signAndSend),
        where('messagetype', '==', messagetype),
        where('cardbundle', "==", false),
        limit(31)
      ) 
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

  getAllByEvent(event: string, bundle: boolean = false): Promise<INewCard[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, 
        where('active', "==", true), 
        where('type', "==", 'card'), 
        where('events', "array-contains", event),
        where('cardbundle', "==", bundle),
        limit(31)
      ) 
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
      let card = this.storageService.getItemDetails(id)
      if (card) resolve(card as INewCard)
      else {
        let data = doc(this.store, 'cards/' + id);
        getDoc(data).then(doc => {
          if (doc.exists()) {
            let card: INewCard = doc.data() as INewCard;
            card.id = doc.id;
            resolve(card);
          }
        })
      }
    });
  }

  getImages(id: string, isGallery: boolean = false): Promise<INewCardImage[]> {
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

        if (isGallery === false) {
          environment.imagetitles.forEach(title => {
            images = [...images, ...temp.filter(x => x.title === title)]
          })
        }
        else {
          environment.gallerytitles.forEach(title => {
            images = [...images, ...temp.filter(x => x.title === title)]
          })
        }        

        resolve(images);
      })
    });
  }

  getRatings(id: string): Promise<INewRating[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + '/ratings');
      const q = query(col, where('approve', "==", true))
      getDocsFromServer(q).then(docs => {
        let ratings: INewRating[] = [];

        docs.forEach(doc => {
          let rating: INewRating = doc.data() as INewRating;
          rating.id = doc.id;
          ratings.push(rating);
        });

        resolve(ratings);
      })
    });
  }

  getSignAndSend(id: string): Promise<INewSignAndSend[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + '/signandsend');
      const q = query(col, orderBy('code', 'asc'))
      getDocs(q).then(docs => {
        let items: INewSignAndSend[] = [];
        docs.forEach(doc => {
          let item: INewSignAndSend = doc.data() as INewSignAndSend;
          item.id = doc.id;
          items.push(item);
        })
        resolve(items);
      })
    });
  }

  async addRating(id: string, rating: NewRating): Promise<string> {
    return new Promise(resolve => {
      addDoc(collection(this.store, 'cards/' + id + "/ratings"), {
        date: serverTimestamp(),
        userId: rating.userId,
        username: rating.username,
        rate: rating.rate,
        title: rating.title,
        review: rating.review,
        approve: false,
        created: serverTimestamp()
      }).then((value) => {
        console.log("ItemId: ", id, " - ReviewId: ", value.id);
        resolve(value.id);
      });
    });
  }

  async getUserRating(id: string, userId: string): Promise<INewRating[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + '/ratings');
      const q = query(col, where('userId', "==", userId))
      getDocs(q).then(docs => {
        let items: INewRating[] = [];
        docs.forEach(doc => {
          let item: INewRating = doc.data() as INewRating;
          item.id = doc.id;
          items.push(item);
        })
        resolve(items);
      })
    });
  }
}
