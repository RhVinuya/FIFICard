import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-postcards',
  templateUrl: './new-postcards.component.html',
  styleUrls: ['./new-postcards.component.scss']
})
export class NewPostcardsComponent implements OnInit {

  constructor() { }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Postcards",
      url: "",
      active: true
    }
  ];

  ngOnInit(): void {
  }

}
