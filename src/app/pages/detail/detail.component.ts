import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonContent, LoadingController } from '@ionic/angular';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { TranslationService } from 'src/app/services/translation.service';
import { FilterService } from 'src/app/services/filter.service';
import { PriceService } from 'src/app/services/price.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Translation } from 'src/app/models/translation';
import { AppComponent } from 'src/app/app.component';
import { EmailService } from 'src/app/services/email.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id?: string;

  card: Card;
  activateRoute: ActivatedRoute;
  service: CardService;
  translationService: TranslationService;
  filter: FilterService;
  priceService: PriceService;
  orderService: OrderService;
  userService: UserService;
  loadingController: LoadingController;
  router: Router;
  title: Title;
  event: string | undefined;
  elementEvent: string;

  description: string = '';
  language: string = 'en';
  descriptionTranslation: Translation;

  orderEnable: boolean = false;

  uid: string;

  constructor(
    private _activateRoute: ActivatedRoute,
    private appComponent: AppComponent,
    private _service: CardService,
    private _emailService: EmailService,
    private _title: Title,
    private _router: Router,
    private _translationService: TranslationService,
    private _filter: FilterService,
    private _priceService: PriceService,
    private _orderService: OrderService,
    private _userService: UserService,
    private _loadingController: LoadingController,
    private location: Location
  ) {
    this.activateRoute = _activateRoute;
    this.service = _service;
    this.router = _router;
    this.translationService = _translationService;
    this.filter = _filter;
    this.priceService = _priceService;
    this.orderService = _orderService;
    this.userService = _userService;
    this.loadingController = _loadingController;
    this.title = _title;
  }

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.uid = userDetails?.uid;

    environment.redirect.forEach(element => {
      if (window.location.hostname.toLowerCase() == element.host.toLowerCase()) {
        this.elementEvent = element.event;
      }
    });

    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadCard();
    });
  }

  async loadCard() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Card...'
    });
    await loading.present();

    try {
      this.card = await this.service.getACard(this.id!);
      this.event = this.card!.event;
      this.title.setTitle(this.card?.name!);
      this.description = this.card.description!;
    }
    finally {
      await loading.dismiss();
    }
  }

  checkIfLoggedIn(id: any): void {
    if (this.orderEnable) {
      let userDetails: string = localStorage.getItem('user')!;
      if (userDetails == null || userDetails.length < 0) {
        this.appComponent.openLoginDialog(id);
      }
      else {
        if (this.card.type === 'clipart') {
          this.addtocard();
        }
        else if (this.card.type === 'ecard') {
          this.router.navigate(['/ecardorder', id]);
        }
        else {
          this.router.navigate(['/order', id]);
        }
      }
    }
  }

  addtocard() {
    let order: Order = new Order();
    order.user_id = this.uid;
    order.card_id = this.card.id!;
    order.card_price = Number(this.getPrice());
    order.shipping_fee = 0;
    order.location = this.priceService.getLocation();
    order.count = 1;
    order.type = this.card.type;
    this.orderService.createClipartOrder(order).then(id => {
      this.userService.addItemOnCart(this.uid, id).then(() => {
        this.router.navigate(['/cart']);
      })
    })
  }

  subscribeLanguage() {
    this.filter.getLang().subscribe(lang => {
      this.language = lang;
      this.loadTranslation();
    });
  }

  subscribeTranslation(id: string) {
    this.translationService.subscribeTranslation(id).subscribe(data => {
      this.descriptionTranslation = data['translated']['description'] as Translation;
      this.loadTranslation();
    })
  }

  loadTranslation() {
    if (this.descriptionTranslation) {
      if (this.language == 'es') this.description = this.descriptionTranslation.es ? this.descriptionTranslation.es : this.description;
      else if (this.language == 'fr') this.description = this.descriptionTranslation.fr ? this.descriptionTranslation.fr : this.description;
      else if (this.language == 'zh') this.description = this.descriptionTranslation.zh ? this.descriptionTranslation.zh : this.description;
      else if (this.language == 'ja') this.description = this.descriptionTranslation.ja ? this.descriptionTranslation.ja : this.description;
      else if (this.language == 'de') this.description = this.descriptionTranslation.de ? this.descriptionTranslation.de : this.description;
      else this.description = this.descriptionTranslation.en ? this.descriptionTranslation.en : this.description;
    }
  }

  getTranslation(id: string) {
    this.translationService.getTranslation(id).then(data => {
      if (!this.verify(data))
        this.updateTranslation(id, this.description);
    }).catch(err => {
      this.addTranslation(id, this.description);
    });
  }

  addTranslation(id: string, description: string) {
    this.translationService.addTranslation(id, description);
  }

  updateTranslation(id: string, description: string) {
    this.translationService.updateTranslation(id, description + ' ');
  }

  verify(translation: Translation): boolean {
    let valid: boolean = true;
    if (translation.en && translation.zh && translation.es && translation.fr && translation.de && translation.ja) {
      valid = true;
    }
    else {
      valid = false;
    }
    return valid;
  }

  getStickerLink(): string {
    let link: string = '';

    link = '/cards/events/' + this.card!.name!.split(' ')[0];

    return link;
  }

  getPrice(): number {
    if (this.card!.type == 'ecard') {
      return this.priceService.getECardPrice(this.card)
    }
    else {
      let type: 'STANDARD' | 'GLITTERED' | 'EMBOSSED' = 'STANDARD'
      if (this.card!.types!.findIndex(x => x == 'STANDARD') >= 0) {
        type = 'STANDARD';
      }
      else if (this.card!.types!.findIndex(x => x == 'GLITTERED') >= 0) {
        type = 'GLITTERED';
      }
      if (this.card!.types!.findIndex(x => x == 'EMBOSSED') >= 0) {
        type = 'EMBOSSED';
      }
      return this.priceService.getPrice(this.card!, type)
    }
  }

  getEventTitle(card: Card): string {
    let value: string = 'Event';
    if (card.type == 'postcard') {
      value = 'Category'
    }
    return value;
  }

  setEnable(event: any) {
    this.orderEnable = event.target.checked;
  }

  onBack() {
    this.location.back();
  }

  isGlittered() {
    return (this.card!.types!.findIndex(x => x == 'GLITTERED') >= 0);
  }

  suggestion(id: string) {
    this.router.navigate(['/card', id]);
  }
}
