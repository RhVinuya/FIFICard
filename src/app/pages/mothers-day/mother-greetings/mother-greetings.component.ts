import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-mother-greetings',
  templateUrl: './mother-greetings.component.html',
  styleUrls: ['./mother-greetings.component.scss']
})
export class MotherGreetingsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
