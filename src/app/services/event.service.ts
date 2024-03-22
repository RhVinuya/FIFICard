import { Injectable } from '@angular/core';
import { query } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { Firestore, collection, doc, getDocFromServer, getDocsFromServer, orderBy, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getById(id: string): Promise<Event> {
    return new Promise((resolve) => {
      getDocFromServer(doc(this.store, 'events/' + id)).then(doc => {
        let event: Event = doc.data() as Event;
        event.id = doc.id;
        resolve(event);
      })
    });
  }

  getByName(event: string): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'events');
      const q = query(col, where('name', '==', event))
      getDocsFromServer(q).then(docs => {
        let events: Event[] = [];
        docs.forEach(doc => {
          let event: Event = doc.data() as Event;
          event.id = doc.id;
          events.push(event);
        })
        resolve(events);
      })
    });
  }

  getEvents(): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'events');
      const q = query(col, orderBy('name', 'asc'))
      getDocsFromServer(q).then(docs => {
        let events: Event[] = [];
        docs.forEach(doc => {
          let event: Event = doc.data() as Event;
          event.id = doc.id;
          events.push(event);
        })
        resolve(events);
      })
    });
  }

  getEventCard(): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      this.getEvents().then(events => {
        resolve(events.filter(x => x.active! == true)
          .filter(x => x.isGift! == false)
          .filter(x => x.isSticker! == false)
          .filter(x => x.isSignAndSend! == false)
          .filter(x => (x.isPostcard! ? x.isPostcard : false) == false)
          .filter(x => (x.isECard! ? x.isECard : false) == false));
      })
    })
  }

  getEventPostcard(): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      this.getEvents().then(events => {
        resolve(events.filter(x => x.active! == true)
          .filter(x => x.isGift! == false)
          .filter(x => x.isSticker! == false)
          .filter(x => x.isSignAndSend! == false)
          .filter(x => (x.isPostcard! ? x.isPostcard : false) == true)
          .filter(x => (x.isECard! ? x.isECard : false) == false));
      })
    })
  }

  getEventGift(): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      let gifts: Event[] = [];
      this.getEvents().then(events => {
        events.forEach(event => {
          if (event.isGift && event.active) {
            gifts.push(event);
          }
        })
        resolve(gifts);
      })
    })
  }

  getEventCreation(): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      let creations: Event[] = [];
      this.getEvents().then(events => {
        events.forEach(event => {
          if (event.isCreations && event.active) {
            creations.push(event);
          }
        })
        resolve(creations);
      })
    })
  }

  getEventSticker(): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      let stickers: Event[] = [];
      this.getEvents().then(events => {
        events.forEach(event => {
          if (event.isSticker && event.active) {
            stickers.push(event);
          }
        })
        resolve(stickers);
      })
    })
  }

  getEventSignAndSend(): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      this.getEvents().then(events => {
        resolve(events.filter(x => x.active! == true).filter(x => x.isSignAndSend! == true));
      })
    })
  }

  getEventECard(): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      this.getEvents().then(events => {
        resolve(events.filter(x => x.active! == true).filter(x => x.isECard! == true));
      })
    })
  }

  getByTag(tag: string): Promise<Event[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'events');
      let q = query(col, where('tag', '==', tag), where('active', '==', true));
      getDocsFromServer(q).then(docs => {
        let events: Event[] = [];
        docs.forEach(doc => {
          let event: Event = doc.data() as Event;
          event.id = doc.id;
          events.push(event);
        })
        resolve(events);
      })
    });
  }
}
