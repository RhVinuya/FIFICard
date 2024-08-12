import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

class Batch {
  public cards: Card[];

  constructor(_cards: Card[]) {
    this.cards = _cards;
  }
}

@Component({
  selector: 'app-cards-slider',
  templateUrl: './cards-slider.component.html',
  styleUrls: ['./cards-slider.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CardsSliderComponent implements OnInit {
  @Input() set cards(_cards: Card[]) {
    this.loadcards(_cards);
  }

  config: NgbCarouselConfig

  constructor(
    _config: NgbCarouselConfig
  ) {
    this.config = _config;

    this.config.interval = 7000;
    this.config.wrap = true;
    this.config.pauseOnHover = true;
    this.config.showNavigationArrows = true;
  }

  items: Batch[] = [];

  ngOnInit(): void {

  }

  loadcards(cards: Card[]) {
    let x: number = 0;
    while (x <= cards.length - 1) {
      let y = x + 5;

      if (y >= cards.length - 1) {
        y = cards.length - 1;
      }

      this.items.push(new Batch(cards.slice(x, y)));
      x = y + 1;
    }
  }

}
