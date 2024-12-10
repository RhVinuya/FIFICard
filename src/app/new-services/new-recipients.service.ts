import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, getDocsFromServer, onSnapshot, DocumentSnapshot } from '@angular/fire/firestore';
import { query, where } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { NewRecipient } from '../new-models/new-recipient';

@Injectable({
  providedIn: 'root'
})
export class NewRecipientService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getRecipients(): Promise<NewRecipient[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'recipients');
      const q = query(col, where('active', "==", true))
      getDocsFromServer(q).then(docs => {
        let recipients: NewRecipient[] = [];
        docs.forEach(doc => {
          let recipient: NewRecipient = doc.data() as NewRecipient;
          recipient.id = doc.id;
          recipients.push(recipient);
        });
        resolve(recipients.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        }));
      })
    });
  }

  getRecipient(id: string): Observable<NewRecipient> {
    return new Observable(subscribe => {
      onSnapshot(doc(this.store, 'recipients/' + id), (snap) => {
        if ((snap as DocumentSnapshot).data()) {
          let recipient = (snap as DocumentSnapshot).data() as NewRecipient;
          recipient.id = (snap as DocumentSnapshot).id;
          subscribe.next(recipient);
        } else {
          subscribe.next(undefined);
        }
      });
    })
  }

}
