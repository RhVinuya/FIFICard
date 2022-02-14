import { CardService } from 'src/app/services/card.service';
import { OrderService } from './order.service';
import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Order } from '../models/order';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  store: Firestore;
  cardService: CardService;

  constructor(
    private _store: Firestore,
    private _storage: Storage,
    private _cardService: CardService
  ) { 
    this.store = _store;
    this.cardService = _cardService
  }

  private async generateHTML(order: Order, url: string): Promise<string>{
    return new Promise((resolve, rejects) => {
      fetch('/assets/static/order.html').then(res => res.text()).then(data => {
        let html = data;
        html = html.replace('[STATUS]', order.status!);
        html = html.replace('[SenderName]', order.sender_name!);
        html = html.replace('[SenderPhone]', order.sender_phone!);
        html = html.replace('[SenderEmail]', order.sender_email!);
        html = html.replace('[ReceiverName]', order.receiver_name!);
        html = html.replace('[ReceiverPhone]', order.receiver_phone!);
        html = html.replace('[ReceiverEmail]', order.receiver_email!);
        html = html.replace('[MESSAGE]', order.message!);
        html = html.replace('[CARDIMAGE]', url == ''? 'http://via.placeholder.com/550x360' : url);
        resolve(html);
      }).catch(reason => {
        rejects(reason);
      })
    });
  }

  private async getCard(id: string): Promise<string>{
    return new Promise((resolve, rejects) => {
      this.cardService.getCard(id).pipe().subscribe(card => {
        let primary: string = card.primary!;
        if ((!primary) || (primary == '')){
          resolve(card.images![0]);
        }
        else{
          resolve(primary);
        }
        
      })  
    });
  }

  sendOrderEmail(order: Order){
    this.getCard(order.card_id!).then(primary => {
      this.cardService.getImageURL(primary).then(url => {
        this.generateHTML(order, url).then(html => {
          const data = collection(this.store, 'mail')
          addDoc(data, {
            to: order.sender_email,
            message: {
              subject: "Fifi Greetings Order Status",
              html: html,
            },
          });
        })
      });
    })    
  }
}