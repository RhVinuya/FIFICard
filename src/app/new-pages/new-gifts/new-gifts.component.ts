import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-gifts',
  templateUrl: './new-gifts.component.html',
  styleUrls: ['./new-gifts.component.scss']
})
export class NewGiftsComponent implements OnInit {

  constructor() { }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Gifts",
      url: "",
      active: true
    }
  ];

  ngOnInit(): void {
  }

}
