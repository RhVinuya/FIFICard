import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  loggedInUser: boolean;
  constructor() { }

  ngOnInit(): void {
    let userDetails: string = localStorage.getItem('user')!;
    this.loggedInUser = userDetails == null || userDetails.length < 0 ? false : true;

  }

}
