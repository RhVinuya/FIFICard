import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { PriceService } from '../services/price.service';

class Banner {
  public name: string;
  public imaage: string;
  public path: string;

  constructor(_name: string, _image: string, _path: string) {
    this.name = _name;
    this.imaage = _image;
    this.path = _path;
  }
}

@Component({
  selector: 'app-home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.scss']
})
export class HomeMobileComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  banners: Banner[] = [
    new Banner('All Cards', '/assets/images/slider/s-main.png', ''),
    new Banner('Halooween', '/assets/images/slider/s-halloween.png', '/halloween'),
    new Banner('Christmas', '/assets/images/slider/s-xmas.png', ''),
    new Banner('Just Because', '/assets/images/slider/s-just-because.png', '/justbecause'),
    new Banner('Sign & Send', '/assets/images/slider/s-sands.png', '/signandsendpage')
  ];

  router: Router;
  def: ChangeDetectorRef;
  priceService: PriceService;

  
  constructor(
    _router: Router,
    _def: ChangeDetectorRef,
    _priceService: PriceService
  ) {
    this.router = _router;
    this.def = _def;
    this.priceService = _priceService
  }
  ngOnInit(): void {
  }


  bannerclick(banner: Banner) {
    if (banner.path != '') {
      this.router.navigate([banner.path]);
    }
  }
}
