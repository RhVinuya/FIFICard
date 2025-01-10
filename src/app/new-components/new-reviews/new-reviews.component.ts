import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NewRating } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';

class Batch {
  public items: NewRating[];

  constructor(_item: NewRating[]) {
    this.items = _item;
  }
}


@Component({
  selector: 'app-new-reviews',
  templateUrl: './new-reviews.component.html',
  styleUrls: ['./new-reviews.component.scss']
})
export class NewReviewsComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  @Input() id?: string;

  batches: Batch[] = [];
  ratings: NewRating[] = [];
  recordCount: number = 0;
  limit: number = 4;
  norecords: boolean;
  newCardService: NewCardService;

  constructor(
    _newCardService: NewCardService,
    config: NgbCarouselConfig
  ) {
    this.newCardService = _newCardService;

    config.interval = 10000;
    config.wrap = true;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.animation = true;
  }

  ngOnInit(): void {
    this.norecords = true;
    this.newCardService.getRatings(this.id!).then(data => {
      if (data.length > 0) {
        data.forEach(rating => {
          if (rating.approve) {
            this.norecords = false;
            this.ratings.push(rating);
          }
        });
        if (this.ratings.length > 0){
          this.recordCount = this.ratings.length;
          this.ratings.sort((a,b)=> {

            if(a.created.toDate() < b.created.toDate()) return 1;
            if(a.created.toDate() > b.created.toDate()) return -1;
            return 0;
          });
          //this.displayRatings = this.ratings.slice(0, this.limit);
          let slides = Math.floor(this.ratings.length / this.limit) + (this.ratings.length % this.limit !== 0 ? 1 : 0);

          let x: number;
          for (x = 1; x <= slides; x++) {
            let end: number = x * this.limit;
            let batch: Batch = new Batch(this.ratings.slice(end - this.limit, end));
            this.batches.push(batch);
          }

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

  previous() {
    this.carousel.prev();
  }

  next() {
    this.carousel.next();
  }
}
