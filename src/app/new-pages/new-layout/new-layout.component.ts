import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.scss']
})
export class NewLayoutComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  constructor() { }

  showHeader: boolean = false;

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    console.log('test')
    this.content.scrollToTop(0);
  }

  logScrolling(value: any) {
    this.showHeader = value.detail.scrollTop >= 25;
  }


}
