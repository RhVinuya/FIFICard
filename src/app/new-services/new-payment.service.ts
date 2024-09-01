import { collection, Firestore, getDocs, orderBy, query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { addDoc, serverTimestamp, where } from 'firebase/firestore';
import { INewPayment, INewPaymongoDetails, INewSpecialCode, INewStripeDetails, NewPayment } from '../new-models/new-payment';
import { environment } from 'src/environments/environment';
import { NewCardService } from './new-card.service';
import { NewStickerService } from './new-sticker.service';
import { NewPostcardService } from './new-postcard.service';
import { NewFileService } from './new-file.service';
import { INewUser } from '../new-models/new-user';
import { HttpClient } from '@angular/common/http';
import { NewGiftService } from './new-gift.service';
import { NewLocationService } from './new-location.service';
import { Provider } from '../new-models/new-enum';

@Injectable({
  providedIn: 'root'
})
export class NewPaymentService {
  store: Firestore;

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;

  http: HttpClient;

  constructor(
    _store: Firestore,

    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _http: HttpClient
  ) {
    this.store = _store;

    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.http = _http;
  }

  getSpecialCodes(): Promise<INewSpecialCode[]> {
    return new Promise((resolve) => {
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

  getAll(id: string): Promise<INewPayment[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'greetings_payment');
      const q = query(col, where('userId', "==", id), orderBy('created', 'desc'))
      getDocs(q).then(docs => {
        let payments: INewPayment[] = [];
        docs.forEach(doc => {
          let payment: INewPayment = doc.data() as INewPayment;
          payment.id = doc.id;
          payments.push(payment);
        })
        resolve(payments);
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
        parovider: payment.provider !== undefined ? payment.provider : null,
        details: payment.details,
        created: serverTimestamp()
      }).then(docRef => {
        resolve(docRef.id);
      });
    });
  }

  stripeCheckout(payment: INewPayment, iUser: INewUser): Promise<string> {
    return new Promise(async (resolve) => {
      let locationService: NewLocationService = new NewLocationService();
      const stripe = require('stripe')(environment.stripe.secretKey);
      let lineitems: any[] = [];

      for await (const item of payment.items) {
        let name: string = '';
        let description: string = '';
        let image: string = '';

        if (item.type === 'card') {
          let iCard = await this.cardService.get(item.itemId);
          if (iCard) {
            name = iCard.name;
            description = iCard.description;
            let images = await this.cardService.getImages(item.itemId);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'sticker') {
          let iSticker = await this.stickerService.get(item.itemId);
          if (iSticker) {
            name = iSticker.name;
            description = iSticker.description;
            let images = await this.stickerService.getImages(item.itemId);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'postcard') {
          let iPostcard = await this.postcardService.get(item.itemId);
          if (iPostcard) {
            name = iPostcard.name;
            description = "Bundle of " + item.bundle!.count.toString() + ' pcs';
            let images = await this.postcardService.getImages(item.itemId);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'gift') {
          let iGift = await this.giftService.get(item.itemId);
          if (iGift) {
            name = iGift.name;
            description = iGift.description;
            let images = await this.giftService.getImages(item.itemId);
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
            currency: locationService.getCurrency(),
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
      let locationService: NewLocationService = new NewLocationService();

      let lineitems: any[] = [];

      for await (const item of payment.items) {
        let name: string = '';
        let description: string = '';
        let image: string = '';

        if (item.type === 'card') {
          let iCard = await this.cardService.get(item.itemId);
          if (iCard) {
            name = iCard.name;
            description = iCard.description;
            let images = await this.cardService.getImages(item.itemId);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'sticker') {
          let iSticker = await this.stickerService.get(item.itemId);
          if (iSticker) {
            name = iSticker.name;
            description = iSticker.description;
            let images = await this.stickerService.getImages(item.itemId);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'postcard') {
          let iPostcard = await this.postcardService.get(item.itemId);
          if (iPostcard) {
            name = iPostcard.name;
            description = "Bundle of " + item.bundle!.count.toString() + ' pcs';
            let images = await this.postcardService.getImages(item.itemId);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }
        else if (item.type === 'gift') {
          let iGift = await this.giftService.get(item.itemId);
          if (iGift) {
            name = iGift.name;
            description = iGift.description;
            let images = await this.giftService.getImages(item.itemId);
            if (images && images.length > 0) {
              image = await this.fileService.getImageURL(images[0].url)
            }
          }
        }

        lineitems.push({
          amount: Number(item.total.toFixed(2).replace(".", "")),
          currency: locationService.getCurrency(),
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

}
