import { Injectable } from '@angular/core';
import { SpecialCode } from '../models/special-code';
import { collection, doc, Firestore, getDocFromServer, getDocsFromServer, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SpecialCodeService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) { 
    this.store = _store;
  }

  get(): Promise<SpecialCode[]>{
    return new Promise((resolve) => {
      let col = collection(this.store, 'specialcode');
      getDocsFromServer(col).then(docs => {
        let codes: SpecialCode[] = [];
        docs.forEach(doc => {
          let code: SpecialCode = doc.data() as SpecialCode;
          code.id = doc.id;
          codes.push(code)
        });
        resolve(codes);
      })
    });
  }

  addPayment(id: string, paymentId: string): Promise<void> {
    return new Promise((resolve) => {
      let document = doc(this.store, 'specialcode/' + id);
      getDocFromServer(document).then(async doc => {
        if (doc.exists()){
          let code: SpecialCode = doc.data() as SpecialCode;
          let ids = code.paymentids ? code.paymentids : [];
          ids.push(paymentId)
          await updateDoc(document, {
            paymentids: ids
          });
          resolve();
        }
      })
    })
  }
}
