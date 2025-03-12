import { Injectable } from '@angular/core';
import { INewCart } from '../new-models/new-cart';
import { NewStorageService } from './new-storage.service';
import { collection, deleteDoc, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { StorageEnum } from '../new-models/new-enum';

@Injectable({
  providedIn: 'root'
})
export class NewCartService {
  store: Firestore;
  storageService: NewStorageService;

  constructor(
    _store: Firestore,
    _storageService: NewStorageService
  ) {
    this.store = _store;
    this.storageService = _storageService;
  }

  getRandomString(): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzZ0123456789';
    var result = '';
    for (var i = 0; i < 20; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  getAllDB(id: string): Promise<INewCart[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'greetings_cart');
      const q = query(col, where('userId', "==", id))
      getDocs(q).then(docs => {
        let iCarts: INewCart[] = [];
        docs.forEach(doc => {
          let iCart: INewCart = doc.data() as INewCart;
          iCart.id = doc.id;
          iCarts.push(iCart);
        })
        resolve(iCarts);
      })
    });
  }

  saveDB(cart: INewCart): Promise<void> {
    return new Promise((resolve) => {
      const data = doc(this.store, 'greetings_cart/' + cart.id);
      setDoc(data, {
        itemId: cart.itemId,
        userId: cart.userId,
        price: cart.price,
        sgprice: cart.sgprice,
        usprice: cart.usprice,
        type: cart.type,
        bundle: cart.bundle === undefined || cart.bundle === null ? null : {
          count: cart.bundle.count,
          price: cart.bundle.price,
          sgprice: cart.bundle.sgprice,
          usprice: cart.bundle.usprice
        },
        personalize: cart.personalize ? cart.personalize : null,
        mark: cart.mark,
      }).then(user => resolve());
    });
  }

  saveStorage(cart: INewCart) {
    this.storageService.saveCart(cart);
  }

  removeStorage(id: string) {
    this.storageService.removeCart(id);
  }

  add(cart: INewCart): Promise<string> {
    return new Promise(async (resolve) => {
      cart.id = this.getRandomString();
      let iUser = this.storageService.getUser();
      if (iUser) {
        cart.userId = iUser.id;
        this.saveDB(cart)
      }
      this.saveStorage(cart)
      resolve(cart.id)
    });
  }

  update(cart: INewCart): Promise<void> {
    return new Promise((resolve) => {
      if (cart.userId !== '') this.saveDB(cart);
      this.storageService.saveCart(cart);
      resolve();
    })
  }

  get(id: string): Promise<INewCart | undefined> {
    return new Promise((resolve) => {
      resolve(this.storageService.getCart(id));
    });
  }

  getAll(): Promise<INewCart[]> {
    return new Promise((resolve) => {
      let carts: INewCart[] = [];
      let ids = this.storageService.getKeyIds(StorageEnum.Cart);
      ids.forEach(id => {
        let cart = this.storageService.getCart(id);
        if (cart) carts.push(cart);
      })

      if (carts.length == 0) {
        let iUser = this.storageService.getUser();
        this.getAllDB(iUser!.id).then( (carts) => {
          carts.forEach( (cart) => {
            this.saveStorage(cart);
          });
          resolve(carts);
        });
      }
      resolve(carts)
    })
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      let cart = this.storageService.getCart(id);
      if (cart && cart.userId !== '') {
        const docs = doc(this.store, 'greetings_cart/' + id);
        deleteDoc(docs);
      }
      this.removeStorage(id);
      resolve();
    })
  }
}
