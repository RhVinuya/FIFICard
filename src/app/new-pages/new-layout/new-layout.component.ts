import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewUser } from 'src/app/new-models/new-user';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.scss']
})
export class NewLayoutComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  router: Router;
  viewportScroller: ViewportScroller;
  storageService: NewStorageService;
  locationService: NewLocationService;
  cartService: NewCartService;
  modalService: NgbModal;

  constructor(
    _router: Router,
    _viewportScroller: ViewportScroller,
    _storageService: NewStorageService,
    _locationService: NewLocationService,
    _cartService: NewCartService,
    _modalService: NgbModal
  ) {
    this.router = _router;
    this.viewportScroller = _viewportScroller;
    this.storageService = _storageService;
    this.locationService = _locationService;
    this.cartService = _cartService;
    this.modalService = _modalService
  }

  showHeader: boolean = false;
  showMenu: boolean = false;
  user: INewUser | undefined;

  async ngOnInit(): Promise<void> {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

    timer(100, 500).subscribe(time => {
      let value = this.storageService.getUser();

      if (this.user === undefined && value !== undefined) {
        //trigger synchronization
        this.synchronizeCart(value);
      }

      if (this.user !== undefined && value === undefined) {
        //trigger clearing 
        this.clearingCart();
      }

      this.user = value === undefined ? undefined : value;
    });
  }

  synchronizeCart(user: INewUser) {
    //get unclaimed cart
    this.cartService.getAll().then(iCarts => {
      iCarts.forEach(iCart => {
        //claimed the cart
        if (iCart.userId === '') {
          iCart.userId = user.id;
          this.cartService.update(iCart);
        }
      })
    })

    //get the carts on the database
    this.cartService.getAllDB(user.id).then(iCarts => {
      if (iCarts.length > 0) {
        //copy on the storage
        iCarts.forEach(iCart => {
          this.cartService.saveStorage(iCart)
        })
      }
    })
  }

  clearingCart() {
    this.cartService.getAll().then(iCarts => {
      iCarts.forEach(iCart => this.cartService.removeStorage(iCart.id) )
    });
  }

  logScrolling(value: any) {
    this.showHeader = value.detail.scrollTop >= 25;
  }

  ionViewDidEnter() {
    this.content.scrollToTop(0);
  }

  onShowMenu(value: boolean) {
    this.showMenu = value;
  }

  onClickSignIn() {
    this.modalService.open(NewLoginComponent, { animation: true });
  }
}
