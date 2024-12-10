import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ECardComment } from './../models/comment';
import { environment } from './../../environments/environment.prod';
import { SignAndSendDetails, SignAndSendPhotoDetails } from './../models/sign-and-send-details';
import { Injectable } from '@angular/core';
import { collection, Firestore, doc, addDoc, docData, updateDoc, serverTimestamp, getDocFromServer, onSnapshot, DocumentSnapshot, getDocsFromServer, query, orderBy, Timestamp } from '@angular/fire/firestore';
import { NewOrder } from '../new-models/new-order';
import { Observable } from 'rxjs';
import { OrderECard } from '../models/order-ecard';

@Injectable({
  providedIn: 'root'
})
export class NewOrderService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  async createOrder(order: NewOrder): Promise<string> {
    return new Promise((resolve, rejects) => {
      const data = collection(this.store, 'orders')
      addDoc(data, {
        user_id: order.user_id,
        card_id: order.card_id,
        card_price: order.card_price,
        location: order.location,
        sender_name: order.sender_name,
        sender_phone: order.sender_phone,
        sender_email: order.sender_email,
        receiver_name: order.receiver_name,
        receiver_phone: order.receiver_phone,
        receiver_email: order.receiver_email,
        address: order.address,
        address1: order.address1,
        address2: order.address2,
        province: order.province,
        city: order.city,
        country: order.country,
        postcode: order.postcode,
        anonymously: order.anonymously,
        sendto: order.sendto,
        message: order.message,
        withSignAndSend: order.withSignAndSend,
        isPaid: false,
        count: order.count,
        shipping_fee: order.shipping_fee,
        type: order.type,
        bundle: order.bundle,
        created: serverTimestamp()
      }).then(docRef => {
        resolve(docRef.id);
      }).catch(reason => {
        rejects(reason);
      })
    });
  }

  async updateOrder(order: NewOrder): Promise<void> {
    const data = doc(this.store, 'orders/' + order.id!);
    return updateDoc(data, {
      user_id: order.user_id,
      card_id: order.card_id,
      card_price: order.card_price,
      location: order.location,
      sender_name: order.sender_name,
      sender_phone: order.sender_phone,
      sender_email: order.sender_email,
      receiver_name: order.receiver_name,
      receiver_phone: order.receiver_phone,
      receiver_email: order.receiver_email,
      address: order.address,
      address1: order.address1,
      address2: order.address2,
      province: order.province,
      city: order.city,
      country: order.country,
      postcode: order.postcode,
      anonymously: order.anonymously,
      sendto: order.sendto,
      message: order.message,
      withSignAndSend: order.withSignAndSend,
      isPaid: false,
      count: order.count,
      shipping_fee: order.shipping_fee,
      type: order.type,
      bundle: order.bundle,
      modified: serverTimestamp()
    })
  }

  async createECardOrder(order: OrderECard): Promise<string> {
    return new Promise((resolve, rejects) => {
      const data = collection(this.store, 'ecard-orders');
      addDoc(data, {
        user_id: order.user_id,
        card_id: order.card_id,
        card_price: order.card_price,
        location: order.location,
        sender_name: order.sender_name,
        sender_phone: order.sender_phone,
        sender_email: order.sender_email,
        receiver_name: order.receiver_name,
        receiver_phone: order.receiver_phone,
        receiver_email: order.receiver_email,
        message: order.message,
        fontstyle: order.fontstyle,
        fontcolor: order.fontcolor,
        fontsize: order.fontsize,
        alignment: order.alignment,
        created: serverTimestamp()
      }).then(docRef => {
        resolve(docRef.id);
      }).catch(reason => {
        rejects(reason);
      })
    });
  }

  async createAddMore(order: NewOrder): Promise<string> {
    return new Promise((resolve, rejects) => {
      const data = collection(this.store, 'orders')
      addDoc(data, {
        parentOrder: order.parentOrder,
        user_id: order.user_id,
        card_id: order.card_id,
        card_price: order.card_price,
        isPaid: false,
        count: order.count,
        shipping_fee: order.shipping_fee,
        created: serverTimestamp()
      }).then(docRef => {
        resolve(docRef.id);
      }).catch(reason => {
        rejects(reason);
      })
    });
  }

  async createClipartOrder(order: NewOrder): Promise<string> {
    return new Promise((resolve, rejects) => {
      const data = collection(this.store, 'orders')
      addDoc(data, {
        user_id: order.user_id,
        card_id: order.card_id,
        card_price: order.card_price,
        location: order.location,
        isPaid: false,
        count: order.count,
        shipping_fee: order.shipping_fee,
        type: order.type,
        created: serverTimestamp()
      }).then(docRef => {
        resolve(docRef.id);
      }).catch(reason => {
        rejects(reason);
      })
    });
  }

  async getOrder(id: string): Promise<NewOrder> {
    return new Promise((resolve) => {
      getDocFromServer(doc(this.store, 'orders/' + id)).then(doc => {
        let order: NewOrder = doc.data() as NewOrder;
        order.id = doc.id;
        resolve(order);
      })
    });
  }

  async getECardOrder(id: string): Promise<OrderECard> {
    return new Promise((resolve) => {
      getDocFromServer(doc(this.store, 'ecard-orders/' + id)).then(doc => {
        let order: OrderECard = doc.data() as OrderECard;
        if (order) order.id = doc.id;
        resolve(order);
      });
    });
  }

  subscribeOrder(id: string): Observable<NewOrder> {
    return new Observable(subscribe => {
      onSnapshot(doc(this.store, 'orders/' + id), (snap) => {
        if ((snap as DocumentSnapshot).data()) {
          let order = (snap as DocumentSnapshot).data() as NewOrder;
          order.id = (snap as DocumentSnapshot).id;
          subscribe.next(order);
        } else {
          subscribe.next(undefined);
        }
      });
    });
  }

  updatePaidOrder(id: string, paymentId: string): Promise<void> {
    const data = doc(this.store, 'orders/' + id);
    return updateDoc(data, {
      isPaid: true,
      paymentId: paymentId
    });
  }

  updatePaidOrders(ids: string[], paymentId: string) {
    ids.forEach(id => {
      const data = doc(this.store, 'orders/' + id);
      updateDoc(data, {
        isPaid: true,
        paymentId: paymentId
      });
    });
  }

  updatePaidECardOrder(id: string, paymentId: string): Promise<void> {
    const data = doc(this.store, 'ecard-orders/' + id);
    return updateDoc(data, {
      isPaid: true,
      paymentId: paymentId
    });
  }

  addSignAndSend(orderId: string, sign: SignAndSendDetails): Promise<NewOrder> {
    return new Promise((resolve, rejects) => {
      const data = collection(this.store, 'orders/' + orderId + '/signandsend')
      addDoc(data, {
        image: sign.image,
        code: sign.code,
        top: sign.top,
        left: sign.left,
        width: sign.width,
        height: sign.height,
        limit: sign.limit,
        style: sign.style,
        text: sign.text,
        size: sign.size,
        alignment: sign.alignment,
        color: sign.color
      }).then(docRef => {
        const data = docData(docRef, { idField: 'id' }) as Observable<NewOrder>;
        data.subscribe(doc => {
          resolve(doc);
        });
      }).catch(reason => {
        rejects(reason);
      })
    });
  }

  getSignAndSend(orderId: string): Promise<SignAndSendDetails[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'orders/' + orderId + '/signandsend');
      getDocsFromServer(col).then(docs => {
        let details: SignAndSendDetails[] = [];
        docs.forEach(doc => {
          let detail: SignAndSendDetails = doc.data() as SignAndSendDetails;
          detail.id = doc.id;
          details.push(detail);
        })
        resolve(details);
      })
    });
  }

  addSignAndSendPhoto(orderId: string, photo: SignAndSendPhotoDetails) {
    return new Promise((resolve, rejects) => {
      const data = collection(this.store, 'orders/' + orderId + '/signandsendphoto')
      addDoc(data, {
        image: photo.image,
        code: photo.code,
        top: photo.top,
        left: photo.left,
        width: photo.width,
        height: photo.height,
        url: photo.url,
        scale: photo.scale,
        imagetop: photo.imagetop,
        imageleft: photo.imageleft
      }).then(docRef => {
        const data = docData(docRef, { idField: 'id' }) as Observable<SignAndSendPhotoDetails>;
        data.subscribe(doc => {
          resolve(doc);
        });
      }).catch(reason => {
        rejects(reason);
      })
    });
  }

  getSignAndSendPhoto(orderId: string): Promise<SignAndSendPhotoDetails[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'orders/' + orderId + '/signandsendphoto');
      getDocsFromServer(col).then(docs => {
        let details: SignAndSendPhotoDetails[] = [];
        docs.forEach(doc => {
          let detail: SignAndSendPhotoDetails = doc.data() as SignAndSendPhotoDetails;
          detail.id = doc.id;
          details.push(detail);
        })
        resolve(details);
      })
    });
  }

  updateECardSent(id: string, sentid: string): Promise<void> {
    const data = doc(this.store, 'ecard-orders/' + id);
    return updateDoc(data, {
      sentid: sentid
    });
  }

  updateECardConfirm(id: string, confirmid: string): Promise<void>  {
    const data = doc(this.store, 'ecard-orders/' + id);
    return updateDoc(data, {
      confirmid: confirmid
    });
  }

  updateExpiry(id: string): Promise<void> {
    const data = doc(this.store, 'ecard-orders/' + id);
    const started = Timestamp.now().toDate();
    started.setDate(started.getDate() + environment.ecardexpiry)
    return updateDoc(data, {
      start: serverTimestamp(),
      expire: Timestamp.fromDate(started)
    });
  }

  updateECardOpened(id: string, openedid: string): Promise<void>  {
    const data = doc(this.store, 'ecard-orders/' + id);
    return updateDoc(data, {
      openedid: openedid
    });
  }

  getComments(id: string): Promise<ECardComment[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'ecard-orders/' + id + '/comments');
      const q = query(col, orderBy("created", "asc"))
      getDocsFromServer(q).then(docs => {
        let comments: ECardComment[] = [];
        docs.forEach(doc => {
          let comment: ECardComment = doc.data() as ECardComment;
          comment.id = doc.id;
          comments.push(comment);
        })
        resolve(comments);
      })
    });
  }

  addComment(id: string, comment: ECardComment): Promise<ECardComment> {
    return new Promise((resolve) => {
      const data = collection(this.store, 'ecard-orders/' + id + '/comments')
      addDoc(data, {
        message: comment.message,
        fontstyle: comment.fontstyle,
        fontcolor: comment.fontcolor,
        fontsize: comment.fontsize,
        user: comment.user,
        created: serverTimestamp()
      }).then(docRef => {
        (docData(docRef, { idField: 'id' }) as Observable<ECardComment>).subscribe(comment => {
          resolve(comment);
        });
      });
    });
  }
}
