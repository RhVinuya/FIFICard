import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-cart',
  templateUrl: './new-cart.component.html',
  styleUrls: ['./new-cart.component.scss']
})
export class NewCartComponent implements OnInit {

  constructor() { }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Cart",
      url: "",
      active: true
    }
  ];

  ngOnInit(): void {
  }

}
