import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  showHeader: boolean = false

  async logScrolling(value: any) {
    this.showHeader = value.detail.scrollTop >= 25;
  }

}