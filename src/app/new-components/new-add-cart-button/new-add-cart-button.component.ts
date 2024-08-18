import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-add-cart-button',
  templateUrl: './new-add-cart-button.component.html',
  styleUrls: ['./new-add-cart-button.component.scss']
})
export class NewAddCartButtonComponent implements OnInit {

  constructor() { }

  isHover: boolean = false

  ngOnInit(): void {
  }

  mouserEnter(){
    this.isHover = true;
  }

  mouseLeave(){
    this.isHover = false;
  }

}
