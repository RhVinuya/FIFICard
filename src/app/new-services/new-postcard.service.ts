import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocFromServer, getDocs, getDocsFromServer, orderBy, query, where } from '@angular/fire/firestore';
import { INewPostcard, INewPostcardBundle, INewPostcardImage } from '../new-models/new-postcard';
import { environment } from 'src/environments/environment';
import { NewStorageService } from './new-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewPostcardService {
  store: Firestore;
  storageService: NewStorageService;

  constructor(
    _store: Firestore,
    _storageService: NewStorageService
  ) {
    this.store = _store;
    this.storageService = _storageService;
  }

  getAll(): Promise<INewPostcard[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards');
      const q = query(col, where('active', "==", true), where('type', "==", 'postcard'))
      getDocs(q).then(docs => {
        let postcards: INewPostcard[] = [];
        docs.forEach(doc => {
          let postcard: INewPostcard = doc.data() as INewPostcard;
          postcard.id = doc.id;
          postcards.push(postcard);
        })
        resolve(postcards);
      })
    });
  }

  get(id: string): Promise<INewPostcard> {
    return new Promise((resolve) => {
      let postcard = this.storageService.getItemDetails(id)
      if (postcard) resolve(postcard as INewPostcard)
      else {
        let data = doc(this.store, 'cards/' + id);
        getDocFromServer(data).then(doc => {
          if (doc.exists()) {
            let postcard: INewPostcard = doc.data() as INewPostcard;
            postcard.id = doc.id;
            resolve(postcard);
          }
        })
      }
    });
  }

  getImages(id: string): Promise<INewPostcardImage[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + '/cardimages');
      const q = query(col, where('active', "==", true))
      getDocsFromServer(q).then(docs => {
        let images: INewPostcardImage[] = [];
        let temp: INewPostcardImage[] = [];

        docs.forEach(doc => {
          let image: INewPostcardImage = doc.data() as INewPostcardImage;
          temp.push(image);
        });

        environment.imagetitles.forEach(title => {
          let image = temp.find(x => x.title === title);
          if (image) images.push(image)
        })

        resolve(images);
      })
    });
  }

  getBundles(id: string): Promise<INewPostcardBundle[]> {
    return new Promise((resolve) => {
      const col = collection(this.store, 'cards/' + id + '/bundles');
      const q = query(col, where('active', "==", true))
      getDocs(q).then(docs => {
        let bundles: INewPostcardBundle[] = [];
        docs.forEach(doc => {
          let bundle: INewPostcardBundle = doc.data() as INewPostcardBundle;
          bundles.push(bundle);
        })
        resolve(bundles);
      })
    });
  }
}
