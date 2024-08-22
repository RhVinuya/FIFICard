import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, doc, Firestore, getDocFromServer, getDocsFromServer, query, setDoc, where } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { INewUser } from '../new-models/new-user';

export class UpdateResponse {
  status: string;
  type: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class NewAccountService {
  store: Firestore;
  auth: Auth;
  firebaseAuth: AngularFireAuth;
  emailError: string = "";
  passwordError: string = "";

  constructor(
    _store: Firestore,
    _auth: Auth,
    _firebaseAuth: AngularFireAuth
  ) {
    this.store = _store;
    this.auth = _auth;
    this.firebaseAuth = _firebaseAuth;
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

  get(id: string): Promise<INewUser> {
    return new Promise((resolve) => {
      let data = doc(this.store, 'users/' + id);
      getDocFromServer(data).then(doc => {
        if (doc.exists()){
          let user: INewUser = doc.data() as INewUser;
          user.id = doc.id;
          resolve(user);
        }
      })
    });
  }

  changePassword(email: string, password: string, newPassword: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.firebaseAuth.signInWithEmailAndPassword(email, password).then(userCredential => {
        if (userCredential) {
          userCredential.user?.updatePassword(newPassword).then(() => {
            resolve(true);
          })
        }
        else {
          resolve(false);
        }
      }).catch(err => {
        resolve(false);
      })
    })
  }

  changeEmail(currentemail: string, newemail: string, password: string): Promise<UpdateResponse> {
    return new Promise((resolve,reject) => {

      this.firebaseAuth.signInWithEmailAndPassword(currentemail, password).then(userCredential => {
        if (userCredential) {
          userCredential.user?.updateEmail(newemail).then(() => {
            resolve({
              status: 'success', 
              type: 'updateemail', 
              message: "The email address is already in use by another account."
            });
          }).catch(err => {
            resolve({
              status: 'error', 
              type: 'updateemail', 
              message: "The email address is already in use by another account."
            });
          })
        }
        else {
          resolve({
            status: 'error', 
            type: 'signin', 
            message: "Incorrect User/Password! "
          });
        }
      }).catch(err => {
        resolve({
          status: 'error', 
          type: 'signin', 
          message: "Incorrect User/Password! "
        });
      })
    })
  }

}
