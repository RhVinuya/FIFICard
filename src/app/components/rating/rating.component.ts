import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';
import { Rating } from 'src/app/models/rating';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() id2?: string;
  service: CardService;
  ratings: Rating[] = [];
  norecords: boolean;
  displayRatings: Rating[] = [];
  recordCount: number = 0;
  limit: number = 3;

  constructor(
    private _service: CardService
  ) {
    this.service = _service;
  }

  ngOnInit(): void {
    this.norecords = true;
    this.service.getRatings(this.id2!).then(data => {
      if (data.length > 0) {
        data.forEach(rating => {
          if (rating.approve) {
            this.norecords = false;
            this.ratings.push(rating);
          }
        });
        if (this.ratings.length > 0){
          this.recordCount = this.ratings.length;
          this.displayRatings = this.ratings.slice(0, this.limit);
          this.norecords = false;
        }
        else{
          this.norecords = true;
        }
      }      
    }).catch(reason => {
      this.norecords = true;
    });
  }

  loadmore(){
    let count: number = this.displayRatings.length + this.limit;
    this.displayRatings = this.ratings.slice(0, count);
  }

}
