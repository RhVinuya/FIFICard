import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gifts-mobile',
  templateUrl: './gifts-mobile.component.html',
  styleUrls: ['./gifts-mobile.component.scss']
})
export class GiftsMobileComponent implements OnInit {

  title: string = "Gifts";

  constructor() { }

  ngOnInit(): void {
  }

}
