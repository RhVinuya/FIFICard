import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  loggedInUser: boolean;
  isMobile: boolean;

  constructor(
    platform: Platform
  ) { 
    this.isMobile = platform.is('capacitor') || platform.is('mobileweb');
  }

  ngOnInit(): void {
    let userDetails: string = localStorage.getItem('user')!;
    this.loggedInUser = userDetails == null || userDetails.length < 0 ? false : true;


  }

}
