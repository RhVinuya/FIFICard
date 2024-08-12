import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { ImageService } from 'src/app/services/image.service';
import { EmailService } from 'src/app/services/email.service';
import { OrderECard } from 'src/app/models/order-ecard';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, AfterViewInit {
  @ViewChild('video') video: ElementRef;

  activateRoute: ActivatedRoute;
  def: ChangeDetectorRef;
  orderService: OrderService;
  cardService: CardService;
  imageService: ImageService;
  emailService: EmailService;

  constructor(
    _activateRoute: ActivatedRoute,
    _def: ChangeDetectorRef,
    _orderService: OrderService,
    _cardService: CardService,
    _imageService: ImageService,
    _emailService: EmailService
  ) {
    this.activateRoute = _activateRoute;
    this.def = _def;
    this.orderService = _orderService;
    this.cardService = _cardService;
    this.imageService = _imageService;
    this.emailService = _emailService;
  }

  orderid: string = '';
  tracked: boolean = false;
  isExpired: boolean = false;
  order: OrderECard = new OrderECard();
  card: Card = new Card();
  url: string = '';
  controls: string[] = [
    'nodownload',
    'nofullscreen',
    'noremoteplayback'
  ];

  ngOnInit(): void {
    this.activateRoute.url.subscribe(urls => {
      this.tracked = urls[0].path == 'playtrack';
      this.orderid = urls[1].path;
    });
  }

  ngAfterViewInit(): void {
    this.loadImage();
  }

  isOrderExpired(order: OrderECard): boolean{
    if (order.expire != undefined){
      if (order.expire.toDate() < (new Date())){
        return true;
      }
    }
    return false;
  }

  loadImage() {
    this.orderService.getECardOrder(this.orderid).then(order => {
      this.order = order;

      if (this.isOrderExpired(order)){
        this.isExpired = true;
        this.def.detectChanges();
        return;
      }
      
      this.cardService.getACard(order.card_id!).then(card => {
        this.card = card;
        this.def.detectChanges();
        this.cardService.getECardImages(card.id!).then(images => {
          let image = images.find(x => x.title == 'video')!;
          this.imageService.getImageURL(image.url).then(url => {
            this.url = url;
            this.def.detectChanges();
          })
        })
      });

      if (order.expire == undefined){
        if (this.tracked){
          this.setExpiryDate();
        }
      }
    });
  }

  setExpiryDate() {
    this.orderService.updateExpiry(this.orderid).then(() => {
      this.orderService.getECardOrder(this.orderid).then(order => {
        this.order = order;
        this.emailService.SendECardOpenedEmail(order).then(id => {
          this.orderService.updateECardOpened(this.orderid, id);
        })
        this.emailService.SendECardOpenedConfirmEmail(order);
      });
    })
  }

}
