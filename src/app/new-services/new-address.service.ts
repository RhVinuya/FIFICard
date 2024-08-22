import { AddressConfig } from '../models/address-config';
import { Injectable } from '@angular/core';
import { INewAddress } from '../new-models/new-address';
import { Firestore, addDoc, collection, doc, getDocFromServer, getDocsFromServer, orderBy, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewAddressService {
  store: Firestore;

  constructor(
    private _store: Firestore
  ) { 
    this.store = _store;
  }

  createAddress(address: INewAddress): Promise<string>{
    return new Promise((resolve) => {
      const col = collection(this.store, 'addresses');
      addDoc(col, {
        'userId': address.userId,
        'name': address.name?address.name:'',
        'firstname': address.firstname,
        'lastname': address.lastname,
        'email': address.email?address.email: '',
        'address': address.address,
        'address2': address.address2?address.address2:'',
        'province': address.province?address.province:'',
        'city': address.city?address.city:'',
        'country': address.country?address.country:'',
        'postcode': address.postcode?address.postcode:''
      }).then(address => {
        resolve(address.id);
      })
    });
  }

  getAddress(id: string): Promise<INewAddress>
  {
    return new Promise((resolve) => {
      getDocFromServer(doc(this.store, 'addresses/' + id)).then(doc => {
        let address: INewAddress = doc.data() as INewAddress;
        address.id = doc.id;
        resolve(address);
      })
    });
  }

  getAddressByUser(userId: string): Promise<INewAddress[]> {
    
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'addresses');
      const q = query(col, where('userId', "==", userId))
      getDocsFromServer(q).then(docs => {
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
  
  updateAddress(address: INewAddress)
  {
    const data = doc(this.store, 'addresses/' + address.id);
    updateDoc(data, {
      'name': address.name?address.name:'',
      'firstname': address.firstname,
      'lastname': address.lastname,
      'address': address.address,
      'address2': address.address2?address.address2:'',
      'province': address.province?address.province:'',
      'city': address.city?address.city:'',
      'country': address.country?address.country:'',
      'postcode': address.postcode?address.postcode:''
    });
  }

  getAddressConfig(): Promise<AddressConfig[]> {
    return new Promise((resolve, rejects) => {
      const col = collection(this.store, 'address_config');
      const q = query(col, orderBy("order", "asc"))
      getDocsFromServer(q).then(docs => {
        let addresses: AddressConfig[] = [];
        docs.forEach(doc => {
          let address: AddressConfig = doc.data() as AddressConfig;
          address.id = doc.id;
          addresses.push(address);
        })
        resolve(addresses);
      })
    });
  }
}