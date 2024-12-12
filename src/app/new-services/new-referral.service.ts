import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from '@angular/fire/firestore';
import { INewReferral } from '../new-models/new-referral';

@Injectable({
  providedIn: 'root'
})
export class NewReferralService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getRandomString(): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < 10; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  create(referral: INewReferral): Promise<void> {
    return new Promise((resolve) => {
      const data = doc(this.store, 'referral' + '/' + referral.id);
      setDoc(data, {
        referredby: referral.referredby,
        email: referral.email,
        status: referral.status,
        created: serverTimestamp()
      }).then(user => resolve());
    });
  }

  get(id: string): Promise<INewReferral | undefined> {
    return new Promise((resolve) => {
      let data = doc(this.store, 'referral/' + id);
      getDoc(data).then(doc => {
        if (doc.exists()) {
          let card: INewReferral = doc.data() as INewReferral;
          card.id = doc.id;
          resolve(card);
        }
        else resolve(undefined)
      })
    });
  }

  getAll(referredby: string): Promise<INewReferral[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'referral');
      const q = query(col, where('referredby', "==", referredby), orderBy('created', 'desc'))
      getDocs(q).then(docs => {
        let referrals: INewReferral[] = [];
        docs.forEach(doc => {
          let referral: INewReferral = doc.data() as INewReferral;
          referral.id = doc.id;
          referrals.push(referral);
        })
        resolve(referrals);
      })
    });
  }
}
