import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-wishlist',
  templateUrl: './new-wishlist.component.html',
  styleUrls: ['./new-wishlist.component.scss']
})
export class NewWishlistComponent implements OnInit {

  constructor() { }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Wishlist (0)",
      url: "",
      active: true
    }
  ];

  ngOnInit(): void {
  }

}
