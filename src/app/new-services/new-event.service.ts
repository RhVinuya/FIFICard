
import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocFromServer, getDocs, getDocsFromServer, query, where, limit, getDoc, orderBy  } from '@angular/fire/firestore';
import { NewStorageService } from './new-storage.service';
import { NewEvent } from '../new-models/new-event';

@Injectable({
  providedIn: 'root'
})
export class NewEventService {

  firestore: Firestore;
  storageService: NewStorageService;

  constructor(
    _firestore: Firestore
  ) {
    this.firestore = _firestore;
  }

  colname: string = 'events';

  get(): Promise<NewEvent[]> {
    return new Promise( (resolve) => {
      const cols = collection(this.firestore, this.colname);
      const q = query(cols, orderBy('name', 'asc'));
      getDocs(q).then( docs => {
        
        let events: NewEvent[] = [];
        docs.forEach(doc => {
          let event: NewEvent = doc.data() as NewEvent;
          event.id = doc.id;
          events.push(event);
        });
        resolve(events);
      });
    });
  }

  getById(id: string): Promise<NewEvent> {
    return new Promise((resolve, rejects) => {
      const docs = doc(this.firestore, this.colname + '/' + id);
      getDocFromServer(docs).then(doc => {
        if (doc.exists()) {
          let event = doc.data() as NewEvent;
          event.id = doc.id;
          resolve(event);
        }
        else{
          rejects("No event found.");
        }
      })
    });
  }

  getEventByType(type: 'card' | 'gift' | 'sticker' | 'postcard' | 'ecard' | 'clipart' | 'epostcard'): Promise<NewEvent[]> {
    return new Promise( (resolve) => {
      const cols = collection(this.firestore, this.colname);
      const qry = query(cols, where('active', '==', true), orderBy('name', 'asc'));
      getDocs(qry).then( (snap) => {
        let events: NewEvent[] = [];
        snap.docs.forEach(doc => {
          let event: NewEvent = doc.data() as NewEvent;

          if (type == 'gift') {
            if (event.isGift) {
              event.id = doc.id;
              events.push(event);
            }
          }
          else if (type == 'sticker') {
            if (event.isSticker) {
              event.id = doc.id;
              events.push(event);
            }
          }
          else if (type == 'postcard') {
            if (event.isPostcard) {
              event.id = doc.id;
              events.push(event);
            }
          }
          else if (type == 'card') {
            if (event.isCard) {
              event.id = doc.id;
              events.push(event);
            }
          }

        });
        resolve(events);
      });
    });
  }

  getCardActive(): Promise<NewEvent[]> {
    return new Promise( (resolve) => {
      const cols = collection(this.firestore, this.colname);
      const qry = query(cols, where('isPostCard', '==', false), where('isGift', '==', false), where('isSticker', '==', false), where('active', '==', true), orderBy('name', 'asc'));
      getDocs(qry).then( snap => {
        let events: NewEvent[] = [];
        snap.forEach(doc => {
          let event: NewEvent =  doc.data() as NewEvent;
          event.id = doc.id;
          events.push(event);
        });
        resolve(events);
      });
    });
  }

  getGiftActive(): Promise<NewEvent[]> {
    return new Promise((resolve) => {
      const cols = collection(this.firestore, this.colname);
      const qry = query(cols, where('isGift', '==', true), where('active', '==', true), orderBy('name', 'asc'));
      getDocs(qry).then( snap => {
        let events: NewEvent[] = [];
        snap.forEach(doc => {
          let event: NewEvent =  doc.data() as NewEvent;
          event.id = doc.id;
          events.push(event);
        });
        resolve(events);
      });
    });
  }

  getStickerActive(): Promise<NewEvent[]> {
    return new Promise((resolve) => {
      const cols = collection(this.firestore, this.colname);
      const qry = query(cols, where('isSticker', '==', true), where('active', '==', true), orderBy('name', 'asc'));
      getDocs(qry).then( snap => {
        let events: NewEvent[] = [];
        snap.forEach(doc => {
          let event: NewEvent =  doc.data() as NewEvent;
          event.id = doc.id;
          events.push(event);
        });
        resolve(events);
      });
    });
  }

  getPostcardActive(): Promise<NewEvent[]> {
    return new Promise((resolve) => {
      const cols = collection(this.firestore, this.colname);
      const qry = query(cols, where('isPostcard', '==', true), where('active', '==', true), orderBy('name', 'asc'));
      getDocs(qry).then( snap => {
        let events: NewEvent[] = [];
        snap.forEach(doc => {
          let event: NewEvent =  doc.data() as NewEvent;
          event.id = doc.id;
          events.push(event);
        });
        resolve(events);
      });
    });
  }
}
