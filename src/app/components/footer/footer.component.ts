import { environment } from 'src/environments/environment';
import { PriceService } from '../../services/price.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  priceService: PriceService

  facebook: string;
  instagram: string;
  pinterest: string;
  twitter: string;
  youtube: string;

  constructor(
    _priceService: PriceService
  ) {
    this.priceService = _priceService
  }

  ngOnInit(): void {
    this.facebook = environment.accounts['facebook'][this.priceService.getLocation()];
    this.instagram = environment.accounts['instagram'][this.priceService.getLocation()];
    this.pinterest = environment.accounts['pinterest'][this.priceService.getLocation()];
    this.twitter = environment.accounts['twitter'][this.priceService.getLocation()];
    this.youtube = environment.accounts['youtube'][this.priceService.getLocation()];
  }

}
