import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { INewCard } from 'src/app/new-models/new-card';
import { INewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { NewUtilService } from 'src/app/new-services/new-util.service';

export interface IWishlist {
  id: string;
  model: INewCard | INewSticker | INewPostcard;
  type: 'card' | 'sticker' | 'postcard';
}

@Component({
  selector: 'app-new-wishlist',
  templateUrl: './new-wishlist.component.html',
  styleUrls: ['./new-wishlist.component.scss']
})
export class NewWishlistComponent implements OnInit, OnDestroy {

  storageService: NewStorageService;

  utilService: NewUtilService;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;

  constructor(
    _storageService: NewStorageService,
    _utilService: NewUtilService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService
  ) {
    this.storageService = _storageService;
    this.utilService = _utilService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
  }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Wishlist",
      url: "",
      active: true
    }
  ];

  subs: Subscription;
  ids: string[] = []
  wishlist: IWishlist[] = [];
  loading: boolean = false;

  async ngOnInit(): Promise<void> {
    this.subs = timer(100, 500).subscribe(time => {
      let ids = this.storageService.getWishist();
      if (ids.length !== this.ids.length) {
        this.loaddata(ids);
        this.breadcrumbs = [
          {
            title: "Home",
            url: "/",
            active: false
          },
          {
            title: "Wishlist (" + ids.length + ")",
            url: "",
            active: true
          }
        ];
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async loaddata(ids: string[]) {
    this.loading = true;
    this.ids = ids;
    let list: IWishlist[] = [];
    for await (let id of ids) {
      let idx = this.wishlist.findIndex(x => x.id === id);
      if (idx >= 0) {
        list.push(this.wishlist[idx])
      }
      else {
        let type = await this.utilService.getType(id);
        if (type === 'card') {
          let iCard = await this.cardService.get(id);
          list.push({
            id: id,
            model: iCard,
            type: type
          })
        }
        else if (type === 'sticker') {
          let iSticker = await this.stickerService.get(id);
          list.push({
            id: id,
            model: iSticker,
            type: type
          })
        }
        else if (type === 'postcard') {
          let iPostcard = await this.postcardService.get(id);
          list.push({
            id: id,
            model: iPostcard,
            type: type
          })
        }
      }
    }
    this.wishlist = [...list];
    this.loading = false;
  }

  getList(type: 'card' | 'sticker' | 'postcard') {
    return this.wishlist.filter(x => x.type === type)
  }

  getICard(model: INewCard | INewSticker | INewPostcard) {
    return model as INewCard
  }

  getISticker(model: INewCard | INewSticker | INewPostcard) {
    return model as INewSticker
  }

  getIPostcard(model: INewCard | INewSticker | INewPostcard) {
    return model as INewPostcard
  }

}
