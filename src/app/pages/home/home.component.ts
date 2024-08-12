import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { PriceService } from 'src/app/services/price.service';
import { environment } from 'src/environments/environment';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    this.def.detectChanges();

    environment.redirect.forEach(element => {
      if (window.location.hostname.toLowerCase() == element.host.toLowerCase()) {
        this.router.navigate([element.main]);
      }
    });
  }

  bannerclick(banner: Banner) {
    if (banner.path != '') {
      this.router.navigate([banner.path]);
    }
  }
}
