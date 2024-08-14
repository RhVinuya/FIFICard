import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-cards',
  templateUrl: './new-cards.component.html',
  styleUrls: ['./new-cards.component.scss']
})
export class NewCardsComponent implements OnInit {

  constructor() { }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Cards",
      url: "",
      active: true
    }
  ];

  ngOnInit(): void {
  }

}
