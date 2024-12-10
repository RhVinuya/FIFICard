import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { INewCard } from 'src/app/new-models/new-card';
import { LocationType, IModelType } from 'src/app/new-models/new-enum';
import { INewGift } from 'src/app/new-models/new-gift';
import { INewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { IWishlist } from 'src/app/new-pages/new-wishlist/new-wishlist.component';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { NewUtilService } from 'src/app/new-services/new-util.service';
import { NewWishlistService } from 'src/app/new-services/new-wishlist.service';

@Component({
  selector: 'app-wishlist-mobile',
  templateUrl: './wishlist-mobile.component.html',
  styleUrls: ['./wishlist-mobile.component.scss']
})
export class WishlistMobileComponent implements OnInit {

  wishlistService: NewWishlistService;
  utilService: NewUtilService;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;

  constructor(
    _wishlistService: NewWishlistService,
    _utilService: NewUtilService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
  ) {
    this.wishlistService = _wishlistService;
    this.utilService = _utilService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
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

  location: LocationType = 'ph';
  subs: Subscription;
  ids: string[] = []
  wishlist: IWishlist[] = [];
  loading: boolean = false;

  async ngOnInit(): Promise<void> {    
    this.subs = timer(100, 500).subscribe(time => {
      let ids = this.wishlistService.get();
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
        else if (type === 'gift') {
          let iGift = await this.giftService.get(id);
          list.push({
            id: id,
            model: iGift,
            type: type
          })
        }
      }
    }
    this.wishlist = [...list];
    this.loading = false;
  }

  getList(type: 'card' | 'sticker' | 'postcard' | 'gift') {
    return this.wishlist.filter(x => x.type === type)
  }

  getICard(model: IModelType) {
    return model as INewCard
  }

  getISticker(model: IModelType) {
    return model as INewSticker
  }

  getIPostcard(model: IModelType) {
    return model as INewPostcard
  }

  getGift(model: IModelType) {
    return model as INewGift
  }

  onRemove(id: string) {
    this.ids = this.ids.filter(o => o !== id);
    this.wishlistService.save(this.ids);
    window.location.reload();
  }

}
