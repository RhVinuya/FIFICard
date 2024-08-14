import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.scss']
})
export class NewLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showHeader: boolean = false

  logScrolling(value: any) {
    this.showHeader = value.detail.scrollTop >= 25;
  }


}
