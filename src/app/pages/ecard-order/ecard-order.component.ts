import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/services/image.service';
import { Title } from '@angular/platform-browser';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PriceService } from 'src/app/services/price.service';
import { ECardImage } from 'src/app/models/ecard-image';
import { OrderECard } from 'src/app/models/order-ecard';

@Component({
  selector: 'app-ecard-order',
  templateUrl: './ecard-order.component.html',
  styleUrls: ['./ecard-order.component.scss']
})
export class ECardOrderComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<ECardOrderComponent>;
  @ViewChild('preview') previewModal: TemplateRef<ECardOrderComponent>;

  activateRoute: ActivatedRoute;
  title: Title;
  def: ChangeDetectorRef;
  modalService: NgbModal;
  router: Router;
  cardService: CardService;
  priceService: PriceService;
  imageService: ImageService;
  orderService: OrderService;
  userService: UserService;
  
  constructor(
    _activateRoute: ActivatedRoute,
    _title: Title,
    _def: ChangeDetectorRef,
    _modalService: NgbModal,
    _router: Router,
    _cardService: CardService,
    _priceService: PriceService,
    _imageService: ImageService,
    _orderService: OrderService,
    _userService: UserService,
    private loc: Location
  ) { 
    this.activateRoute = _activateRoute;
    this.title = _title;
    this.def = _def;
    this.modalService = _modalService;
    this.router = _router;
    this.cardService = _cardService;
    this.priceService = _priceService;
    this.imageService = _imageService;
    this.orderService = _orderService;
    this.userService = _userService;
  }

  id: string = '';
  card: Card;
  preview: ECardImage;
  previewImage: string = '';
  form = new FormGroup({
    sender_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    sender_email: new FormControl('', [Validators.required, Validators.email]),
    sender_phone: new FormControl('', [Validators.maxLength(20)]),
    receiver_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    receiver_email: new FormControl('', [Validators.required, Validators.email]),
    receiver_phone: new FormControl('', [Validators.maxLength(20)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });
  submitted: boolean = false;
  saving: boolean = false;
  modalRef: NgbModalRef;
  uid: string;

  message = {
    text: "",
    fontstyle: "", 
    fontcolor: "", 
    fontsize: 0,
    alignment: ''
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadCard();
    });

    this.uid = JSON.parse(localStorage.getItem('user')!)!.uid;
    this.def.detectChanges();
  }

  loadCard(){
    this.cardService.getACard(this.id).then(card => {
      this.card = card;
      this.title.setTitle(card.name!);
      this.def.detectChanges();
      this.loadPreview();
    })
  }

  loadPreview(){
    this.cardService.getECardImages(this.id).then(images => {
      this.preview = images.find(x => x.title == 'preview')!;
      this.imageService.getImageURL(this.preview.url).then(url => {
        this.previewImage = url;
        this.def.detectChanges();
      })
    })
  }

  controls(){
    return this.form.controls;
  }

  addToCart(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.saving = true;
    this.def.detectChanges();  

    let order: OrderECard = this.form.value as OrderECard;
    order.user_id = this.uid;
    order.card_id = this.id;
    order.card_price = this.priceService.getECardPrice(this.card);
    order.location = this.priceService.location;

    order.fontstyle = this.message.fontstyle;
    order.fontcolor = this.message.fontcolor;
    order.fontsize = this.message.fontsize;
    order.alignment = this.message.alignment as ('left' | 'center' | 'right');
    
    this.orderService.createECardOrder(order).then(id => {
      this.userService.addItemOnECart(this.uid, id);
      this.saving = false;
      this.def.detectChanges();  
      this.modalRef = this.modalService.open(this.modal, { animation: true, backdrop: 'static', size: 'lg' });
    }).catch(err => {
      this.saving = false;
      this.def.detectChanges(); 
    })
  }

  keepShopping(){
    this.modalRef.close('');
    window.location.href = "/e-cards";
  }

  cart(){
    this.modalRef.close('');
    window.location.href = "/cart";
  }

  onBack() {
    this.loc.back();
  }

  onChangeMessage(message: any){
    this.message = message;
    this.form.controls.message.setValue(this.message.text);
  }

  previewMessage(){
    this.modalService.open(this.previewModal, { animation: true, size: 'xl' });
  }
}
