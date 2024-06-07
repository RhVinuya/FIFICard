import { environment } from 'src/environments/environment';
import { CardImage } from './../models/card-image';
import { SignAndSend, SignAndSendPhoto } from './../models/sign-and-send';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { Rating } from '../models/rating';
import { Bundle } from '../models/bundle';
import { ECardImage } from '../models/ecard-image';
import { ClipartFile } from '../models/clipart-file';
import { DocumentSnapshot, Firestore, addDoc, collection, doc, endAt, getDocFromServer, getDocsFromServer, limitToLast, onSnapshot, orderBy, query, serverTimestamp, startAt, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getBestsellerCards(): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('bestseller', "==", true))
      getDocsFromServer(q).then(docs => {
        let addresses: Card[] = [];
        docs.forEach(doc => {
          let address: Card = doc.data() as Card;
          address.id = doc.id;
          addresses.push(address);
        })
        resolve(addresses);
      })
    });
  }

  getFeaturedCards(_event: string, limit: number): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('featured', "==", true), where('type', '==', 'card'), where('events', "array-contains", _event.trim()), limitToLast(limit))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getSuggestions(_event: string, type: 'card' | 'gift' | 'sticker' | 'postcard' | 'ecard' | 'clipart', limit: number): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('events', "array-contains", _event), where(type, "==", type),limitToLast(limit))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getSignAndSendSuggestions(_event: string, limit: number): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('events', "array-contains", _event), where('signAndSend', "==", true), limitToLast(limit))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getCardsByEvent(_event: string): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('events', "array-contains", _event))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getCardsByTypeAndEvent(_type: 'card' | 'gift' | 'sticker' | 'postcard' | 'ecard' | 'clipart', _event: string): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('events', "array-contains", _event), where('active', "==", true), where('type', "==", _type))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getCardsByType(_type: 'card' | 'gift' | 'sticker' | 'postcard' | 'ecard' | 'clipart'): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('type', "==", _type))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getPoetryCardsByEvent(_event: string): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('messagetype', "==", 'poetry'), where('events', "array-contains", _event.trim()))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getSignAndSendByEvent(_event: string): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('signAndSend', "==", true), where('events', "array-contains", _event.trim()))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getCardsByRecipient(_recipient: string): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('recipients', "array-contains", _recipient.trim()))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getSearchCards(field: string, search: string): Promise<Card[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), orderBy(field), startAt(search), endAt(search + "\uf8ff"))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getSignAndSendCards(): Promise<Card[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('signAndSend', "==", true))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getSignAndSendFeaturedCards(): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('featured', "==", true), where('signAndSend', "==", true), where('events', "array-contains", "Valentine's Day"))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getCards(): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getCard(id: string): Observable<Card> {
    return new Observable(subscribe => {
      onSnapshot(doc(this.store, 'cards/' + id), (snap) => {
        if ((snap as DocumentSnapshot).data()) {
          let card = (snap as DocumentSnapshot).data() as Card;
          card.id = (snap as DocumentSnapshot).id;
          subscribe.next(card);
        } else {
          subscribe.next(undefined);
        }
      });
    });
  }

  getACard(id: string): Promise<Card> {
    return new Promise((resolve) => {
      getDocFromServer(doc(this.store, 'cards/' + id)).then(doc => {
        let card: Card = doc.data() as Card;
        card.id = doc.id;
        resolve(card);
      })
    });
  }

  async getRatings(id: string): Promise<Rating[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'cards/' + id + "/ratings");
      const q = query(col, orderBy("created", "desc"))
      getDocsFromServer(q).then(docs => {
        let ratings: Rating[] = [];
        docs.forEach(doc => {
          let rating: Rating = doc.data() as Rating;
          rating.id = doc.id;
          ratings.push(rating);
        })
        resolve(ratings);
      })
    });
  }


  async addRating(id: string, rating: Rating): Promise<string> {
    return new Promise(resolve => {
      addDoc(collection(this.store, 'cards/' + id + "/ratings"), {
        date: serverTimestamp(),
        username: rating.username,
        rate: rating.rate,
        title: rating.title,
        review: rating.review,
        approve: false,
        created: serverTimestamp()
      }).then((value) => {
        resolve(value.id);
      });
    });
  }

  async updateFavorite(cardId: string, favorites: string[]): Promise<void> {
    return updateDoc(doc(this.store, 'cards/' + cardId), {
      'favorites': favorites
    });
  }

  async getSignAndSend(id: string): Promise<SignAndSend[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + "/signandsend");
      getDocsFromServer(col).then(docs => {
        let signAndSends: SignAndSend[] = [];
        docs.forEach(doc => {
          let signAndSend: SignAndSend = doc.data() as SignAndSend;
          signAndSend.id = doc.id;
          signAndSends.push(signAndSend);
        })
        resolve(signAndSends);
      })
    });
  }

  async getSignAndSendPhoto(id: string): Promise<SignAndSendPhoto[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + "/signandsendphoto");
      getDocsFromServer(col).then(docs => {
        let signAndSendPhotos: SignAndSendPhoto[] = [];
        docs.forEach(doc => {
          let signAndSendPhoto: SignAndSendPhoto = doc.data() as SignAndSendPhoto;
          signAndSendPhoto.id = doc.id;
          signAndSendPhotos.push(signAndSendPhoto);
        })
        resolve(signAndSendPhotos);
      })
    });
  }

  async updateCardOrder(id: string, orders: string[]): Promise<void> {
    return updateDoc(doc(this.store, 'cards/' + id), {
      'orders': orders
    });
  }

  getCardImages(id: string): Promise<CardImage[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'cards/' + id + "/cardimages");
      const q = query(col, where('active', '==', true))
      getDocsFromServer(q).then(docs => {
        let cardImages: CardImage[] = [];
        docs.forEach(doc => {
          let cardImage: CardImage = doc.data() as CardImage;
          cardImage.id = doc.id;
          cardImages.push(cardImage);
        })
        resolve(cardImages);
      })
    });
  }

  getECardImages(id: string): Promise<ECardImage[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + "/ecardimages");
      getDocsFromServer(col).then(docs => {
        let eCardImages: ECardImage[] = [];
        docs.forEach(doc => {
          let eCardImage: ECardImage = doc.data() as ECardImage;
          eCardImage.id = doc.id;
          eCardImages.push(eCardImage);
        })
        resolve(eCardImages);
      })
    });
  }

  getImages(id: string): Promise<CardImage[]> {
    return new Promise(async (resolve, rejects) => {
      let cardimages: CardImage[] = [];
      let images: CardImage[] = await this.getCardImages(id);
      if (images.length > 0) {
        environment.imagetitles.forEach(title => {
          images.forEach(image => {
            if (image.title == title) {
              cardimages.push(image);
            }
          });
        });
        resolve(cardimages);
      }
      else {
        let card: Card = await this.getACard(id);
        if (card.primary) {
          let primary: CardImage = new CardImage();
          primary.title = environment.imagetitles[0];
          primary.active = true;
          primary.url = card.primary!;
        }
        if (card.images) {
          card.images.forEach(img => {
            if (img != card.primary!) {
              let image: CardImage = new CardImage();
              image.title = 'Other';
              image.active = true;
              image.url = img;
              cardimages.push(image);
            }
          })
        }
        resolve(cardimages);
      }
    });
  }

  getPrimaryImage(id: string): Promise<string> {
    return new Promise(async (resolve) => {
      let images: CardImage[] = await this.getCardImages(id);
      if (images.length > 0) {
        let index = images.findIndex(x => x.title == environment.imagetitles[0]);
        if (index >= 0) resolve(images[index].url);
        else resolve(images[0].url);
      }
      else {
        let card: Card = await this.getACard(id);
        if (card.primary) resolve(card.primary);
        else if (card.images) resolve(card.images[0]);
        else resolve("");
      }
    });
  }

  getBundles(id: string): Promise<Bundle[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + "/bundles");
      const q = query(col, where('active', "==", true), orderBy('count', 'asc'))
      getDocsFromServer(q).then(docs => {
        let bundles: Bundle[] = [];
        docs.forEach(doc => {
          let bundle: Bundle = doc.data() as Bundle;
          bundle.id = doc.id;
          bundles.push(bundle);
        })
        resolve(bundles);
      })
    });
  }

  getGiftsByRecipient(_recipient: string): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('type', "==", 'gift'), where('recipients', "array-contains", _recipient))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getGiftsLimited(limit: number): Promise<Card[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('type', "==", 'gift'))
      getDocsFromServer(q).then(docs => {
        let cards: Card[] = [];
        docs.forEach(doc => {
          let card: Card = doc.data() as Card;
          card.id = doc.id;
          cards.push(card);
        })
        resolve(cards);
      })
    });
  }

  getClipartFile(id: string): Promise<ClipartFile[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + "/clipartimages");
      const q = query(col, orderBy('created', 'asc'))
      getDocsFromServer(q).then(docs => {
        let cliparts: ClipartFile[] = [];
        docs.forEach(doc => {
          let clipart: ClipartFile = doc.data() as ClipartFile;
          clipart.id = doc.id;
          cliparts.push(clipart);
        })
        resolve(cliparts);
      })
    });
  }
}
