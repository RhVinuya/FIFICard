import { Component, Input, OnInit } from '@angular/core';
import { Rating } from 'src/app/models/rating';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-rating-decimal',
  templateUrl: './rating-decimal.component.html',
  styleUrls: ['./rating-decimal.component.scss']
})
export class RatingDecimalComponent implements OnInit {
  @Input() cardId?: string;
  ratings: Rating[] = [];
  norecords: boolean;
  service: CardService;
  rateCount = 0;
  currentRate = 0;

  constructor(private _service: CardService) {
    this.service = _service;
  }

  ngOnInit(): void {
    this.norecords = true;
    this.service.getRatings(this.cardId!).then(data => {
      if (data.length > 0) {
        data.forEach(rating => {
          if (rating.approve) {
            this.norecords = false;
            this.ratings.push(rating);
            this.rateCount = this.rateCount + 1;
            this.currentRate = this.currentRate + rating.rate;
          }
        });
        if (this.norecords === false){
          this.currentRate = Number((this.currentRate/this.ratings.length).toFixed(2));
        }
      }
    }).catch(reason => {
      this.norecords = true;
    });
  }
}
