import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, doc, Firestore, getDocsFromServer, query, setDoc, where } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { INewUser } from '../new-models/new-user';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {
  store: Firestore;
  auth: Auth;

  constructor(
    _store: Firestore,
    _auth: Auth
  ) {
    this.store = _store;
    this.auth = _auth;
  }

  colname: string = 'users';

  register(email: string, password: string): Promise<string> {
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(this.auth, email, password).then(user => {
        resolve(user.user.uid);
      })
    });
  }

  setUser(user: INewUser): Promise<void> {
    return new Promise((resolve) => {
      const data = doc(this.store, this.colname +  '/' + user.id);
      setDoc(data, {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        notification: user.notification,
        customer: true,
      }).then(user => resolve());
    });
  }

  getByEmail(email: string): Promise<INewUser[]> {
    return new Promise((resolve) => {
      let col = collection(this.store, this.colname)
      let qry = query(col, where('email', "==", email));
      getDocsFromServer(qry).then(docs => {
        let users: INewUser[] = [];
        docs.forEach(doc => {
          let user: INewUser = doc.data() as INewUser;
          user.id = doc.id;
          users.push(user)
        });
        resolve(users);
      });
    });
  }
}
