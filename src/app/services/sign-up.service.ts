import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SignUp } from '../models/sign-up';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) { 
    this.store = _store;
  }

  add(signup: SignUp): Promise<string>{
    return new Promise((resolve) => {
      const col = collection(this.store, 'signup-greetings');
      addDoc(col, {
        firstname: signup.firstname,
        lastname: signup.lastname,
        email: signup.email,
        created: serverTimestamp()
      }).then(address => {
        resolve(address.id);
      })
    });
  }
}
