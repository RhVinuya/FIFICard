import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-wish-indicator',
  templateUrl: './new-wish-indicator.component.html',
  styleUrls: ['./new-wish-indicator.component.scss']
})
export class NewWishIndicatorComponent implements OnInit {

  constructor() { }

  isMark: boolean = false

  ngOnInit(): void {
  }

  onClick(){
    this.isMark = !this.isMark;
  }

}