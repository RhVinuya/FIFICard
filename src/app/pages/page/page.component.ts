import { environment } from 'src/environments/environment';
import { FilterService } from 'src/app/services/filter.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  activateRoute: ActivatedRoute;
  filter: FilterService;
  priceService: PriceService;
  htmlString: string;
  lang: string;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _filter: FilterService,
    private _priceService: PriceService
  ) {
    this.activateRoute = _activateRoute;
    this.filter = _filter;
    this.priceService = _priceService;
  }

  ngOnInit(): void {
    this.filter.getLang().subscribe(lang => {
      this.activateRoute.params.subscribe(params => {
        let id: string = params['id'];
        let path = "/assets/static/" + lang + '/' + id + ".html";
        
        if (id.includes(".html")) {
          path = "/assets/static/" + id
        }

        fetch(path).then(res => res.text()).then(data => {
          let accounts = environment.accounts;
          let html = data;

          html = html.replaceAll('[FACEBOOK]', accounts['facebook'][this.priceService.getLocation()]);
          html = html.replaceAll('[YOUTUBE]', accounts['youtube'][this.priceService.getLocation()]);
          html = html.replaceAll('[TWITTER]', accounts['twitter'][this.priceService.getLocation()]);
          html = html.replaceAll('[PINTEREST]', accounts['pinterest'][this.priceService.getLocation()]);
          html = html.replaceAll('[TIKTOK]', accounts['tiktok'][this.priceService.getLocation()]);
          html = html.replaceAll('[INSTAGRAM]', accounts['instagram'][this.priceService.getLocation()]);

          if (this.priceService.getLocation() === 'us') {
            html = html.replaceAll('[SITE_TITLE]', "FiBeiGreetings USA");
            html = html.replaceAll('[EMAILADDRESS]', "marketing.fibeigreetingsusa@gmail.com");
          }
          else if (this.priceService.getLocation() === 'sg') {
            html = html.replaceAll('[SITE_TITLE]', "FiBeiGreetings SG");
            html = html.replaceAll('[EMAILADDRESS]', "fibeigreetingssingapore@gmail.com");
          }
          else {
            html = html.replaceAll('[SITE_TITLE]', "FiBeiGreetings PH");
            html = html.replaceAll('[EMAILADDRESS]', "fibeigreetingsph@gmail.com");
          }

          this.htmlString = html;
        }).catch(reason => {
        })
      });
    });
  }
}
