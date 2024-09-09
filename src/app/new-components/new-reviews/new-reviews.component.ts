import { Component, Input, OnInit } from '@angular/core';
import { NewRating } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';

@Component({
  selector: 'app-new-reviews',
  templateUrl: './new-reviews.component.html',
  styleUrls: ['./new-reviews.component.scss']
})
export class NewReviewsComponent implements OnInit {

  @Input() id?: string;

  displayRatings: NewRating[] = [];
  ratings: NewRating[] = [];
  recordCount: number = 0;
  limit: number = 3;
  norecords: boolean;
  newCardService: NewCardService;


  constructor(
    private _newCardService: NewCardService
  ) {
    this.newCardService = _newCardService;
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

  loadmore() {
    let count: number = this.displayRatings.length + this.limit;
    this.displayRatings = this.ratings.slice(0, count);
  }
}
