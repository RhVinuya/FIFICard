import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { INewAddress, INewAddressConfig } from '../new-models/new-address';

@Injectable({
  providedIn: 'root'
})
export class NewAddressService {
  store: Firestore;

  constructor(
    _store: Firestore
  ) {
    this.store = _store;
  }

  getConfig(): Promise<INewAddressConfig[]>{
    return new Promise((resolve) => {
      const col = collection(this.store, 'address_config');
      const q = query(col, orderBy('order', 'asc'))
      getDocs(q).then(docs => {
        let config: INewAddressConfig[] = [];
        docs.forEach(doc => {
          let value: INewAddressConfig = doc.data() as INewAddressConfig;
          config.push(value);
        })
        resolve(config);
      })
    });
  }

  getAll(id: string): Promise<INewAddress[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'addresses');
      const q = query(col, where('userId', "==", id))
      getDocs(q).then(docs => {
        let addresses: INewAddress[] = [];
        docs.forEach(doc => {
          let address: INewAddress = doc.data() as INewAddress;
          address.id = doc.id;
          addresses.push(address);
        })
        resolve(addresses);
      })
    });
  }

  create(address: INewAddress): Promise<string>{
    return new Promise((resolve) => {
      const data = collection(this.store, 'addresses')
      addDoc(data, {
        userId: address.userId,
        firstname: address.firstname,
        lastname: address.lastname,
        email: address.email,
        address: address.address,
        city: address.city,
        province: address.province,
        country: address.country,
        postcode: address.postcode,
      }).then(docRef => {
        resolve(docRef.id);
      });
    });
  }

  update(address: INewAddress): Promise<void>{
    const data = doc(this.store, 'addresses/' + address.id);
    return updateDoc(data, {
        firstname: address.firstname,
        lastname: address.lastname,
        email: address.email,
        address: address.address,
        city: address.city,
        province: address.province,
        country: address.country,
        postcode: address.postcode
    })
  }
}
