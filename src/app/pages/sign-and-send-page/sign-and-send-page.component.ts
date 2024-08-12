import { PriceService } from '../../services/price.service';
import { CardService } from '../../services/card.service';
import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-and-send-page',
  templateUrl: './sign-and-send-page.component.html',
  styleUrls: ['./sign-and-send-page.component.scss']
})
export class SignAndSendPageComponent implements OnInit {
  isMobile: boolean;
  priceService: PriceService;

  constructor(
    _priceService: PriceService
  ) { 
    this.priceService = _priceService
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 600;
  }

}
