import { Payment } from './../models/payment';
import { collection, collectionData, doc, docData, Firestore, getDocs, getDocsFromServer, orderBy, query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes, UploadResult } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Status } from '../models/status';
import { addDoc, getDocFromServer, serverTimestamp, Timestamp } from 'firebase/firestore';
import { INewPayment, INewPaymongoDetails, INewSpecialCode, INewStripeDetails, NewPayment } from '../new-models/new-payment';
import { environment } from 'src/environments/environment';
import { NewCardService } from './new-card.service';
import { NewStickerService } from './new-sticker.service';
import { NewPostcardService } from './new-postcard.service';
import { NewFileService } from './new-file.service';
import { INewUser } from '../new-models/new-user';
import { HttpClient } from '@angular/common/http';
import { NewGiftService } from './new-gift.service';

@Injectable({
  providedIn: 'root'
})
export class NewPaymentService {
  storage: Storage;
  store: Firestore;

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  http: HttpClient;

  constructor(
    _storage: Storage,
    _store: Firestore,

    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _http: HttpClient
  ) {
    this.storage = _storage;
    this.store = _store;

    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.http = _http;
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

  stripeCheckout(payment: INewPayment, iUser: INewUser): Promise<string> {
    return new Promise(async (resolve) => {
      const stripe = require('stripe')(environment.stripe.secretKey);
      let lineitems: any[] = [];

      for await (const item of payment.items) {
        let name: string = '';
        let description: string = '';
        let image: string = '';

        if (item.type === 'card') {
          let iCard = await this.cardService.get(item.itemid);
          if (iCard) {
            name = iCard.name;
            description = iCard.description;
            let images = await this.cardService.getImages(item.itemid);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'sticker') {
          let iSticker = await this.stickerService.get(item.itemid);
          if (iSticker) {
            name = iSticker.name;
            description = iSticker.description;
            let images = await this.stickerService.getImages(item.itemid);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'postcard') {
          let iPostcard = await this.postcardService.get(item.itemid);
          if (iPostcard) {
            name = iPostcard.name;
            description = "Bundle of " + item.bundle!.count.toString() + ' pcs';
            let images = await this.postcardService.getImages(item.itemid);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'gift') {
          let iGift = await this.giftService.get(item.itemid);
          if (iGift) {
            name = iGift.name;
            description = iGift.description;
            let images = await this.giftService.getImages(item.itemid);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }

        lineitems.push({
          price_data: {
            product_data: {
              name: name,
              description: description,
              images: [image]
            },
            currency: 'PHP',
            unit_amount: Number(item.total).toFixed(2).replace(".", "")
          },
          quantity: 1
        });
      }

      const paymentcheckout = await stripe.checkout.sessions.create({
        line_items: lineitems,
        mode: 'payment',
        success_url: window.location.origin + '/new/payment/card/{CHECKOUT_SESSION_ID}',
        cancel_url: window.location.origin + '/new/cart',
        client_reference_id: iUser.id,
        customer_email: iUser.email
      });

      resolve(paymentcheckout.url);
    });
  }

  stripeConfirm(id: string): Promise<INewStripeDetails> {
    return new Promise(async (resolve) => {
      const stripe = require('stripe')(environment.stripe.secretKey);
      const session = await stripe.checkout.sessions.retrieve(id);
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);

      resolve({
        id: paymentIntent.id,
        type: paymentMethod.type,
        brand: paymentMethod.card ? paymentMethod.card.brand : '',
        amount: Number(paymentIntent.amount) / 100,
        last4: paymentMethod.card ? paymentMethod.card.last4 : '',
        live: environment.stripe.live
      });
    });
  }

  payMongoCheckout(type: 'gcash' | 'paymaya', payment: INewPayment): Promise<any> {
    return new Promise(async (resolve) => {
      let lineitems: any[] = [];

      for await (const item of payment.items) {
        let name: string = '';
        let description: string = '';
        let image: string = '';

        if (item.type === 'card') {
          let iCard = await this.cardService.get(item.itemid);
          if (iCard) {
            name = iCard.name;
            description = iCard.description;
            let images = await this.cardService.getImages(item.itemid);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'sticker') {
          let iSticker = await this.stickerService.get(item.itemid);
          if (iSticker) {
            name = iSticker.name;
            description = iSticker.description;
            let images = await this.stickerService.getImages(item.itemid);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'postcard') {
          let iPostcard = await this.postcardService.get(item.itemid);
          if (iPostcard) {
            name = iPostcard.name;
            description = "Bundle of " + item.bundle!.count.toString() + ' pcs';
            let images = await this.postcardService.getImages(item.itemid);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'gift') {
          let iGift = await this.giftService.get(item.itemid);
          if (iGift) {
            name = iGift.name;
            description = iGift.description;
            let images = await this.giftService.getImages(item.itemid);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }

        lineitems.push({
          amount: Number(item.total.toFixed(2).replace(".", "")),
          currency: 'PHP',
          name: name,
          description: description.substring(0, 255),
          images: [image],
          quantity: 1
        })
      }

      const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic =' + window.btoa(environment.paymongo.secretKey + ":" + environment.paymongo.publicKey)
      }

      const body = JSON.stringify({
        data: {
          attributes: {
            description: 'Fibei Greetings',
            line_items: lineitems,
            payment_method_types: [type],
            send_email_receipt: false,
            show_description: true,
            show_line_items: true,
            success_url: window.location.origin + '/new/payment/paymongo'
          }
        }
      });

      let response = this.http.post('https://api.paymongo.com/v1/checkout_sessions', body, { 'headers': headers });
      response.subscribe(result => {
        let data: any = JSON.parse(JSON.stringify(result));
        resolve({
          id: data.data.id,
          url: data.data.attributes.checkout_url
        })
      })
    })
  }

  payMongoConfirm(id: string): Promise<INewPaymongoDetails | undefined> {
    return new Promise((resolve) => {
      const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic =' + window.btoa(environment.paymongo.secretKey + ":" + environment.paymongo.publicKey)
      }

      let response = this.http.get('https://api.paymongo.com/v1/checkout_sessions/' + id, { 'headers': headers });
      response.subscribe(result => {
        console.log(result)
        let data: any = JSON.parse(JSON.stringify(result));
        if ((data.data.attributes.payments as any[]).length > 0) {
          (data.data.attributes.payments as any[]).forEach(payment => {
            if (payment.attributes.status === 'paid') {
              resolve({
                id: payment.id,
                type: payment.attributes.source.type,
                amount: Number(payment.attributes.amount) / 100
              } as INewPaymongoDetails);
            }
          });
        }
        else {
          resolve(undefined)
        }
      })
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
