import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INewUser } from '../new-models/new-user';
import { INewCart } from '../new-models/new-cart';
import { INewPayment } from '../new-models/new-payment';
import { INewPersonalize } from '../new-models/new-personalize';
import { IModelType, StorageEnum } from '../new-models/new-enum';
import { NewEvent } from '../new-models/new-event';

@Injectable({
  providedIn: 'root'
})
export class NewStorageService {

  constructor() { }

  getKeyIds(value: string): string[] {
    let keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key !== null) {
        if (key.includes(environment.storage + value)) keys.push(key);
      }
    }
    return keys;
  }

  //-----------------

  createRemember(email: string, password: string) {
    localStorage.setItem(environment.storage + StorageEnum.RememberEmail, email);
    localStorage.setItem(environment.storage + StorageEnum.RememberPassword, password);
  }

  getRemember() {
    return {
      email: localStorage.getItem(environment.storage + StorageEnum.RememberEmail),
      password: localStorage.getItem(environment.storage + StorageEnum.RememberPassword)
    }
  }

  clearRemember() {
    localStorage.removeItem(environment.storage + StorageEnum.RememberEmail);
    localStorage.removeItem(environment.storage + StorageEnum.RememberPassword);
  }

  //-----------------

  createUser(user: INewUser) {
    localStorage.setItem(environment.storage + StorageEnum.Account, JSON.stringify(user));
  }

  getUser(): INewUser | undefined {
    let user: string | null = localStorage.getItem(environment.storage + StorageEnum.Account)
    if (user !== null) {
      return JSON.parse(user);
    }
    return undefined;
  }

  clearUser() {
    localStorage.removeItem(environment.storage + StorageEnum.Account);
  }

  //------------------

  saveCart(cart: INewCart) {
    localStorage.setItem(environment.storage + StorageEnum.Cart + cart.id, JSON.stringify(cart));
  }

  getCart(id: string): INewCart | undefined {
    let key: string = '';
    if (id.includes(environment.storage + StorageEnum.Cart)) key = id;
    else key = environment.storage + StorageEnum.Cart + id;
    
    let value: string | null = localStorage.getItem(key)
    if (value !== null) return JSON.parse(value);
    else return undefined;
  }

  removeCart(id: string) {
    localStorage.removeItem(environment.storage + StorageEnum.Cart + id);
  }

  //------------------

  saveWishlist(ids: string[]) {
    localStorage.setItem(environment.storage + StorageEnum.Wishlist, JSON.stringify(ids));
  }

  getWishist(): string[] {
    let ids: string | null = localStorage.getItem(environment.storage + StorageEnum.Wishlist)
    if (ids !== null) return JSON.parse(ids);
    else return [];
  }

  clearWishlist() {
    localStorage.removeItem(environment.storage + StorageEnum.Wishlist);
  }

  //------------------

  saveCheckoutList(ids: string[]) {
    localStorage.setItem(environment.storage + StorageEnum.Checkout, JSON.stringify(ids));
  }

  getCheckoutList(): string[] {
    let ids: string | null = localStorage.getItem(environment.storage + StorageEnum.Checkout)
    if (ids !== null) return JSON.parse(ids);
    else return [];
  }

  clearCheckoutList() {
    localStorage.removeItem(environment.storage + StorageEnum.Checkout);
  }

  //------------------

  savePayment(payment: INewPayment) {
    localStorage.setItem(environment.storage + StorageEnum.Payment, JSON.stringify(payment));
  }

  getPayment(): INewPayment | undefined {
    let ids: string | null = localStorage.getItem(environment.storage + StorageEnum.Payment)
    if (ids !== null) return JSON.parse(ids);
    else return undefined;
  }

  clearPayment() {
    localStorage.removeItem(environment.storage + StorageEnum.Payment);
  }

  //-------------------

  savePaymongoID(id: string) {
    localStorage.setItem(environment.storage + StorageEnum.PayMongo, id);
  }

  getPaymongoID(): string {
    let id: string | null = localStorage.getItem(environment.storage + StorageEnum.PayMongo)
    return id === null ? '' : id;
  }

  clearPaymongoID() {
    localStorage.removeItem(environment.storage + StorageEnum.PayMongo);
  }

  //---------------------

  savePersonalize(value: INewPersonalize) {
    localStorage.setItem(environment.storage + StorageEnum.Personalize + value.id, JSON.stringify(value));
  }

  getPersonalize(id: string): INewPersonalize | undefined {
    let key: string = '';
    if (id.includes(environment.storage + StorageEnum.Personalize)) key = id;
    else key = environment.storage + StorageEnum.Personalize + id;

    let data: string | null = localStorage.getItem(key)
    if (data !== null) return JSON.parse(data);
    else return undefined;
  }

  removePersonalize(id: string) {
    localStorage.removeItem(environment.storage + StorageEnum.Personalize + id);
  }

  //--------------------

  saveItemDetails(item: IModelType) {
    localStorage.setItem(environment.storage + StorageEnum.Item + item.id, JSON.stringify(item));
  }

  getItemDetails(id: string): IModelType | undefined {
    let data: string | null = localStorage.getItem(environment.storage + StorageEnum.Item + id)
    if (data !== null) return JSON.parse(data);
    else return undefined;
  }

  //-------------------

  saveImageURL(id: string, value: string) {
    localStorage.setItem(environment.storage + StorageEnum.Image + id, value);
  }

  getImageURL(id: string) {
    let data: string | null = localStorage.getItem(environment.storage + StorageEnum.Image + id)
    if (data !== null) return data;
    else return '';
  }

  

  getCategories(type: 'cards' | 'stickers' | 'postcards' | 'gifts'): NewEvent[] | null {
    let data: string | null = localStorage.getItem(environment.storage + type.toUpperCase() + "-" + StorageEnum.Categories)
    if (data !== null) return JSON.parse(data);
    else return null;
  }

  saveCategories(type: 'cards' | 'stickers' | 'postcards' | 'gifts' , items: NewEvent[]) {
    localStorage.setItem(environment.storage + type.toUpperCase() + "-" + StorageEnum.Categories, JSON.stringify(items));
  }


}
