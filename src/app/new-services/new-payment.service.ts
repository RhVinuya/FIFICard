import { Payment } from './../models/payment';
import { collection, collectionData, doc, docData, Firestore, getDocs, getDocsFromServer, orderBy, query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes, UploadResult } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Status } from '../models/status';
import { addDoc, getDocFromServer, serverTimestamp, Timestamp } from 'firebase/firestore';
import { INewSpecialCode, NewPayment } from '../new-models/new-payment';

@Injectable({
  providedIn: 'root'
})
export class NewPaymentService {
  storage: Storage;
  store: Firestore

  constructor(
    _storage: Storage,
    _store: Firestore
  ) {
    this.storage = _storage;
    this.store = _store;
  }

  getSpecialCodes(): Promise<INewSpecialCode[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'specialcode');
      getDocs(col).then(docs => {
        let codes: INewSpecialCode[] = [];
        docs.forEach(doc => {
          let code: INewSpecialCode = doc.data() as INewSpecialCode;
          code.id = doc.id;
          codes.push(code);
        })
        resolve(codes);
      })
    });
  }

  add(payment: NewPayment): Promise<string> {
    return new Promise((resolve) => {
      const data = collection(this.store, 'greetings_payment');
      addDoc(data, {
        userId: payment.userId,
        sender: payment.sender,
        receiver: payment.receiver,
        subtotal: payment.subtotal,
        shippingFee: payment.shippingFee,
        total: payment.total,
        items: payment.items,
        location: payment.location,
        gateway: payment.gateway,
        details: payment.details,
        created: serverTimestamp()
      }).then(docRef => {
        resolve(docRef.id);
      });
    });
  }





  private getRandomString(): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 20; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  uploadFile(file: File): Promise<UploadResult> {
    let id = this.getRandomString();
    const reference = ref(this.storage, 'payment/' + id);
    return uploadBytes(reference, file);
  }

  async getInitial(): Promise<string> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'status');
      const q = query(col, orderBy("order", "asc"))
      getDocsFromServer(q).then(docs => {
        if (docs.empty === false) {
          docs.forEach(doc => {
            let status: Status = doc.data() as Status;
            resolve(status.name)
          })
        }
        else {
          resolve("New");
        }
      })
    });
  }

  async createPayment(payment: Payment): Promise<string> {
    return new Promise((resolve) => {
      let details = null;
      if (payment.stripe) {
        details = {
          id: payment.stripe.id,
          type: payment.stripe.type,
          brand: payment.stripe.brand,
          amount: payment.stripe.amount,
          last4: payment.stripe.last4,
        }
      }

      const data = collection(this.store, 'payments')
      addDoc(data, {
        user_id: payment.user_id,
        gateway: payment.gateway,
        orders: payment.orders,
        total: Number(payment.total),
        proof: payment.proof ? payment.proof : "",
        transactionId: payment.transactionId ? payment.transactionId : "",
        payerId: payment.payerId ? payment.payerId : "",
        payerEmail: payment.payerEmail ? payment.payerEmail : "",
        status: payment.status,
        created: serverTimestamp(),
        stripe: details,
        specialcode: payment.specialcode ? payment.specialcode : ""
      }).then(docRef => {
        resolve(docRef.id);
      });
    })
  }

  getPayment(id: string): Promise<Payment> {
    return new Promise((resolve) => {
      getDocFromServer(doc(this.store, 'payments/' + id)).then(doc => {
        let payment: Payment = doc.data() as Payment;
        payment.id = doc.id;
        resolve(payment);
      })
    });
  }

}
