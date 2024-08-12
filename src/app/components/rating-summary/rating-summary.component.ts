import { Title } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Rating } from 'src/app/models/rating';
import { CardService } from 'src/app/services/card.service';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-rating-summary',
  templateUrl: './rating-summary.component.html',
  styleUrls: ['./rating-summary.component.scss']
})
export class RatingSummaryComponent implements OnInit {
  @Input() cardId?: string;

  ratings: Rating[] = [];
  norecords: boolean;
  service: CardService;
  rateCount = 0;
  currentRate = 0;
  currentRateStr = "0.0";
  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  dialogRef: MatDialogRef<ReviewComponent>;
  snackBar: MatSnackBar;
  userDetails: any;
  isLogIn = true;
  modalService: NgbModal

  rating: Rating;

  constructor(
    public dialog: MatDialog,
    private _service: CardService,
    private _snackBar: MatSnackBar,
    private _modalService: NgbModal
  ) {
    this.service = _service;
    this.snackBar = _snackBar;
    this.modalService = _modalService
  }

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.userDetails = userDetails;
    this.isLogIn = userDetails == null || userDetails.length < 0 ? true : false;

    this.norecords = true;
    this.service.getRatings(this.cardId!).then(data => {
      if (data.length > 0) {
        data.forEach(rating => {
          if (rating.approve) {
            this.norecords = false;
            this.ratings.push(rating);
            this.rateCount = this.rateCount + 1;
            this.currentRate = this.currentRate + rating.rate;

            switch (rating.rate) {
              case 1:
                this.rate1 += 1;
                break;
              case 2:
                this.rate2 += 1;
                break;
              case 3:
                this.rate3 += 1;
                break;
              case 4:
                this.rate4 += 1;
                break;
              default:
                this.rate5 += 1;
                break;
            }
          }
        });
        this.currentRate = this.currentRate / this.rateCount;
        this.currentRateStr = Number.isNaN(this.currentRate) ? '0' : this.currentRate.toFixed(1);
      }
    }).catch(reason => {
      this.norecords = true;
    });

  }

  calculateRate(rate: number): number {
    return (rate / this.rateCount) * 100;
  }

  writeReviewDialog(confimation: any) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(ReviewComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(data => {
      this.rating = data as Rating;
      if (this.rating.title != undefined) {
        this._service.addRating(this.cardId!, this.rating);
        this.openConfirmation(confimation);
      }
    });
  }

  openConfirmation(confirmation: any) {
    let ngbModalOptions: NgbModalOptions = {};
    this.modalService.open(confirmation, ngbModalOptions);
  }

}
