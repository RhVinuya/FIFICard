import { PriceService } from './../../services/price.service';
import { FilterService } from 'src/app/services/filter.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

class Language {
  public name: string;
  public code: string;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logo: string;
  languages: Language[] = [];
  lang: string;

  priceService: PriceService;

  constructor(
    private translate: TranslateService,
    private filter: FilterService,
    private _priceService: PriceService
  ) {
    this.priceService = _priceService;
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem("language")! ? localStorage.getItem("language")! : 'en';
    this.filter.setLang(this.lang);

    this.logo = "/assets/images/logo_fibeigreetings.png";

    environment.redirect.forEach(element => {
      if (window.location.hostname.toLowerCase() == element.host.toLowerCase()) {
        this.logo = element.logo;
      }
    });
  }

  changeLang(event: any) {
    this.translate.use(event.target.value);
    localStorage.setItem("language", event.target.value);
    this.filter.setLang(event.target.value);
  }
}
