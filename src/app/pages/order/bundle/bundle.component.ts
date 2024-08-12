import { CardService } from 'src/app/services/card.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Bundle } from 'src/app/models/bundle';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.scss']
})
export class BundleComponent implements OnInit {
  @Input() view: boolean = false;

  @Input() set card(_card: Card) {
    this.messagetype = _card.messagetype;
    this.loadBundle(_card);
  }

  @Output() bundle: EventEmitter<Bundle> = new EventEmitter();

  sevice: CardService;
  priceService: PriceService;

  constructor(
    _sevice: CardService,
    _priceService: PriceService
  ) {
    this.sevice = _sevice;
    this.priceService = _priceService;
  }

  bundles: Bundle[] = [];
  singleprice: number = 0;
  selected: string = '';
  messagetype: 'regular' | 'poetry' = 'regular';
  type: 'card' | 'gift' | 'sticker' | 'postcard' | 'ecard' | 'clipart' | 'epostcard';

  ngOnInit(): void {
  }

  loadBundle(_card: Card) {
    this.type = _card.type;

    this.sevice.getBundles(_card.id!).then(bundles => {
      if(bundles.length > 0){
        this.bundles = bundles;
  
        if (_card.type != 'postcard') {
          let bundle: Bundle = new Bundle();
          bundle.id = 'single';
          bundle.count = 1;
          bundle.price = this.getPrice(_card);
          this.bundles.unshift(bundle);
          this.selected = bundle.id;
        }
        else {
          this.selected = this.bundles[0].id;
          this.bundle.emit(this.bundles[0]);
        }
      }
    });
  }

  getTypeLabel(): string {
    let typelabel = 'Greeting Card'
    if (this.type == 'postcard') {
      typelabel = 'Postcard'
    }
    return typelabel;
  }

  getlabel(bundle: Bundle): string {
    let label: string = '';
    let typelabel = 'Greeting Card'
    if (this.type == 'postcard') {
      typelabel = 'Postcard'
    }


    if (bundle.count > 1) {
      label = 'Bundle of ' + bundle.count + 'pcs of ' + typelabel + 's – ' + this.priceService.getSign() + ' ' + this.priceService.getBundlePrice(this.messagetype, bundle).toFixed(2);
    }
    else
      label = 'Single ' + typelabel + ' – ' + this.priceService.getSign() + ' ' + bundle.price.toFixed(2);

    return label
  }

  change(event: any) {
    let index = this.bundles.findIndex(x => x.id == event.target.id);
    if (index < 0)
      return;

    let bundle = this.bundles[index];
    this.bundle.emit(bundle);
  }

  getPrice(card: Card): number {
    let type: 'STANDARD' | 'GLITTERED' | 'EMBOSSED' = 'STANDARD'
    if (card.types!.findIndex(x => x == 'STANDARD') >= 0) {
      type = 'STANDARD';
    }
    else if (card.types!.findIndex(x => x == 'GLITTERED') >= 0) {
      type = 'GLITTERED';
    }
    if (card.types!.findIndex(x => x == 'EMBOSSED') >= 0) {
      type = 'EMBOSSED';
    }
    return this.priceService.getPrice(card, type)
  }
}
