import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INewGoogleUser, INewUser } from '../new-models/new-user';

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

  createUser(user: INewUser){
    localStorage.setItem(environment.storage + 'ACCOUNT', JSON.stringify(user));
  }

  getUser(): INewUser | undefined{
    let user: string | null = localStorage.getItem(environment.storage + 'ACCOUNT')
    if (user !== null) {
      return JSON.parse(user);
    }
    return undefined;
  }

  clearUser() {
    localStorage.removeItem(environment.storage + 'ACCOUNT');
  }
}
