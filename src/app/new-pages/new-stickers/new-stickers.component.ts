import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-stickers',
  templateUrl: './new-stickers.component.html',
  styleUrls: ['./new-stickers.component.scss']
})
export class NewStickersComponent implements OnInit {

  constructor() { }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Stickers",
      url: "",
      active: true
    }
  ];

  ngOnInit(): void {
  }

}
