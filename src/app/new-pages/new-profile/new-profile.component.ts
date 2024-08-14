import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit {

  constructor() { }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Profile",
      url: "",
      active: true
    }
  ];

  ngOnInit(): void {
  }

}
