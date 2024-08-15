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

  constructor() { }

  showHeader: boolean = false;
  showMenu: boolean = false;

  ngOnInit(): void {
  }

  logScrolling(value: any) {
    this.showHeader = value.detail.scrollTop >= 25;
  }

  ionViewDidEnter() {
    this.content.scrollToTop(0);
  }

  onShowMenu(value: boolean) {
    this.showMenu = value;
  }
}
