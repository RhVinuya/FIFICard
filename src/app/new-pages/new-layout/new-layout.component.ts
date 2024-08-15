import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.scss']
})
export class NewLayoutComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('menu') menu: NgbPopover;

  constructor() { }

  showHeader: boolean = false;
  showMenu: boolean = false;
  forClose: boolean = false;
  hideDivTimeout: any;

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    this.content.scrollToTop(0);
  }

  logScrolling(value: any) {
    this.showHeader = value.detail.scrollTop >= 25;
  }

  onHover(){
    this.forClose = false
    this.showMenu = true;
  }

  onHoverOut(){
    this.forClose = true
    this.hideDivTimeout = setTimeout(() => {
      if (this.forClose) this.showMenu = false;
    }, 200);
  }
}
