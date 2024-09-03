import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { LocationType } from 'src/app/new-models/new-enum';
import { INewUser } from 'src/app/new-models/new-user';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { NewWishlistService } from 'src/app/new-services/new-wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-layout-header',
  templateUrl: './new-layout-header.component.html',
  styleUrls: ['./new-layout-header.component.scss']
})
export class NewLayoutHeaderComponent implements OnInit {
  @Input() type: 0 | 1;
  @Input() isUserLoggedIn: boolean = false;
  @Input() set user(_value: INewUser | undefined) {
    this._user = _value
  }

  @Input() set showHeader(_value: boolean) {
    this._showHeader = _value;
    if (_value == true) {
      this.forClose = true
      this.showMenu = false;
    }
  }
  @Output() onShowMenu: EventEmitter<boolean> = new EventEmitter();

  locationService: NewLocationService;
  wishlistService: NewWishlistService;
  cartService: NewCartService;
  personalizeService: NewPersonalizeService;
  router: Router;

  constructor(
    _locationService: NewLocationService,
    _wishlistService: NewWishlistService,
    _cartService: NewCartService,
    _personalizeService: NewPersonalizeService,
    _router: Router
  ) { 
    this.locationService = _locationService;
    this.wishlistService = _wishlistService;
    this.cartService = _cartService;
    this.personalizeService = _personalizeService;
    this.router = _router
  }

  location: LocationType;
  logo: string = '';
  _user: INewUser | undefined = undefined;
  _showHeader: boolean = false;
  showMenu: boolean = false;
  forClose: boolean = false;
  menuType: 'stickers' | 'postcards' | 'gifts' | undefined;
  hideDivTimeout: any;
  eventpriorities = environment.eventpriorities;
  wishlistCountDisplay = '';
  cartCountDisplay = '';
  projectCountDisplay = '';

  ngOnInit(): void {
    this.location = this.locationService.getlocation();
    this.logo = this.locationService.getLogo();

    timer(100, 500).subscribe(async time => {

      let count = this.wishlistService.get().length;
      if (count > 0 && count <= 9) this.wishlistCountDisplay = count.toString();
      else if (count > 9) this.wishlistCountDisplay = '9+';
      else this.wishlistCountDisplay = '';

      count = (await this.cartService.getAll()).length;
      if (count > 0 && count <= 9) this.cartCountDisplay = count.toString();
      else if (count > 9) this.cartCountDisplay = '9+';
      else this.cartCountDisplay = '';

      count = (await this.personalizeService.getAll()).length;
      if (count > 0 && count <= 9) this.projectCountDisplay = count.toString();
      else if (count > 9) this.projectCountDisplay = '9+';
      else this.projectCountDisplay = '';
    });
  }

  onHover(menu: 'stickers' | 'postcards' | 'gifts' | undefined) {
    if (menu) {
      this.menuType = menu;
    }
    this.forClose = false
    this.showMenu = true;
    this.onShowMenu.emit(this.showMenu)
  }

  onHoverOut() {
    this.forClose = true
    this.hideDivTimeout = setTimeout(() => {
      if (this.forClose) {
        this.showMenu = false;
        this.onShowMenu.emit(this.showMenu)
      }
    }, 200);
  }

  onOpen(url: string) {
    this.showMenu = false;
    this.onShowMenu.emit(this.showMenu);
    this.router.navigate([url]);
  }

}