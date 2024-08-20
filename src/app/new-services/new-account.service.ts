import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, doc, Firestore, getDocFromServer, getDocsFromServer, query, setDoc, where } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { INewGoogleUser, INewUser } from '../new-models/new-user';

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

  authenticate(email: string, password: string): Promise<string> {
    return new Promise((resolve, rejects) => {
      signInWithEmailAndPassword(this.auth, email, password).then(user => {
        resolve(user.user.uid);
      }).catch(err => rejects(err));
    });
  }

  googleAuthenticate(): Promise<INewGoogleUser> {
    return new Promise((resolve, rejects) => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(this.auth, provider).then(value => {
        resolve({
          id: value.user.uid,
          email: value.user.email,
          photoURL: value.user.photoURL,
          providerId: value.providerId
        } as INewGoogleUser)
      }).catch(err => rejects(err));
    });
  }

  setUser(user: INewUser): Promise<void> {
    return new Promise((resolve) => {
      const data = doc(this.store, this.colname + '/' + user.id);
      setDoc(data, {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        birthday: user.birthday,
        notification: user.notification,
        customer: true,
        providerId: user.providerId,
        photoURL: user.photoURL
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

  get(id: string): Promise<INewUser | undefined> {
    return new Promise((resolve) => {
      let data = doc(this.store, 'users/' + id);
      getDocFromServer(data).then(doc => {
        if (doc.exists()) {
          let user: INewUser = doc.data() as INewUser;
          user.id = doc.id;
          resolve(user);
        }
        else resolve(undefined)
      })
    });
  }
}
