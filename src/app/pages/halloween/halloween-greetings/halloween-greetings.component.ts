import { CardService } from 'src/app/services/card.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-halloween-greetings',
  templateUrl: './halloween-greetings.component.html',
  styleUrls: ['./halloween-greetings.component.scss']
})
export class HalloweenGreetingsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
