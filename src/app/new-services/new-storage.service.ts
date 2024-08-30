import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INewUser } from '../new-models/new-user';
import { INewCart } from '../new-models/new-cart';
import { INewPayment } from '../new-models/new-payment';
import { INewPersonalize } from '../new-models/new-personalize';
import { INewCard } from '../new-models/new-card';
import { INewSticker } from '../new-models/new-sticker';
import { INewPostcard } from '../new-models/new-postcard';
import { INewGift } from '../new-models/new-gift';
import { IModelType } from '../new-models/new-enum';

@Injectable({
  providedIn: 'root'
})
export class NewStorageService {

  constructor() { }

  createRemember(email: string, password: string) {
    localStorage.setItem(environment.storage + 'REMEMBER_EMAIL', email);
    localStorage.setItem(environment.storage + 'REMEMBER_PASSWORD', password);
  }

  getRemember() {
    return {
      email: localStorage.getItem(environment.storage + 'REMEMBER_EMAIL'),
      password: localStorage.getItem(environment.storage + 'REMEMBER_PASSWORD')
    }
  }

  clearRemember() {
    localStorage.removeItem(environment.storage + 'REMEMBER_EMAIL');
    localStorage.removeItem(environment.storage + 'REMEMBER_PASSWORD');
  }

  //-----------------

  createUser(user: INewUser) {
    localStorage.setItem(environment.storage + 'ACCOUNT', JSON.stringify(user));
  }

  getUser(): INewUser | undefined {
    let user: string | null = localStorage.getItem(environment.storage + 'ACCOUNT')
    if (user !== null) {
      return JSON.parse(user);
    }
    return undefined;
  }

  clearUser() {
    localStorage.removeItem(environment.storage + 'ACCOUNT');
  }

  //------------------

  saveCartList(ids: string[]) {
    localStorage.setItem(environment.storage + 'CART-LIST', JSON.stringify(ids));
  }

  getCartList(): string[] {
    let ids: string | null = localStorage.getItem(environment.storage + 'CART-LIST')
    if (ids !== null) return JSON.parse(ids);
    else return [];
  }

  saveCart(cart: INewCart) {
    localStorage.setItem(environment.storage + 'CART-' + cart.id, JSON.stringify(cart));
  }

  getCart(id: string): INewCart | undefined {
    let value: string | null = localStorage.getItem(environment.storage + 'CART-' + id)
    if (value !== null) return JSON.parse(value);
    else return undefined;
  }

  removeCart(id: string) {
    localStorage.removeItem(environment.storage + 'CART-' + id);
  }

  //------------------

  saveWishlist(ids: string[]) {
    localStorage.setItem(environment.storage + 'WISHLIST', JSON.stringify(ids));
  }

  getWishist(): string[] {
    let ids: string | null = localStorage.getItem(environment.storage + 'WISHLIST')
    if (ids !== null) return JSON.parse(ids);
    else return [];
  }

  clearWishlist(){
    localStorage.removeItem(environment.storage + 'WISHLIST');
  }

  //------------------
  
  saveCheckoutList(ids: string[]) {
    localStorage.setItem(environment.storage + 'CHECKOUT', JSON.stringify(ids));
  }

  getCheckoutList(): string[] {
    let ids: string | null = localStorage.getItem(environment.storage + 'CHECKOUT')
    if (ids !== null) return JSON.parse(ids);
    else return [];
  }

  clearCheckoutList(){
    localStorage.removeItem(environment.storage + 'CHECKOUT');
  }

  //------------------

  savePayment(payment: INewPayment) {
    localStorage.setItem(environment.storage + 'PAYMENT', JSON.stringify(payment));
  }

  getPayment(): INewPayment | undefined {
    let ids: string | null = localStorage.getItem(environment.storage + 'PAYMENT')
    if (ids !== null) return JSON.parse(ids);
    else return undefined;
  }

  clearPayment(){
    localStorage.removeItem(environment.storage + 'PAYMENT');
  }

  //-------------------

  savePaymongoID(id: string) {
    localStorage.setItem(environment.storage + 'PAYMONGO', id);
  }

  getPaymongoID(): string {
    let id: string | null = localStorage.getItem(environment.storage + 'PAYMONGO')
    return id === null ? '' : id;
  }

  clearPaymongoID(){
    localStorage.removeItem(environment.storage + 'PAYMONGO');
  }

  //---------------------

  savePersonalizeIds(ids: string[]) {
    localStorage.setItem(environment.storage + 'PERSONALIZE-IDS', JSON.stringify(ids));
  }

  getPersonalizeIds(): string[]{
    let data: string | null = localStorage.getItem(environment.storage + 'PERSONALIZE-IDS')
    if (data !== null) return JSON.parse(data);
    else return [];
  }

  savePersonalize(value: INewPersonalize) {
    localStorage.setItem(environment.storage + 'PERSONALIZE-' + value.id, JSON.stringify(value));
  }

  getPersonalize(id: string): INewPersonalize | undefined {
    let data: string | null = localStorage.getItem(environment.storage + 'PERSONALIZE-' + id)
    if (data !== null) return JSON.parse(data);
    else return undefined;
  }

  removePersonalize(id: string){
    localStorage.removeItem(environment.storage + 'PERSONALIZE-' + id);
  }

  //--------------------

  saveItemDetails(item: IModelType) {
    localStorage.setItem(environment.storage + 'ITEM-' + item.id, JSON.stringify(item));
  }

  getItemDetails(id: string): IModelType | undefined {
    let data: string | null = localStorage.getItem(environment.storage + 'ITEM-' + id)
    if (data !== null) return JSON.parse(data);
    else return undefined;
  }

  //-------------------

  saveImageURL(id: string, value: string) {
    localStorage.setItem(environment.storage + 'IMAGE-' + id, value);
  }

  getImageURL(id: string) {
    let data: string | null = localStorage.getItem(environment.storage + 'IMAGE-' + id)
    if (data !== null) return data;
    else return '';
  } 

}
