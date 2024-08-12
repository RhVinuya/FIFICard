import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  rating: number;
  form: UntypedFormGroup;
  data: Rating;
  userDetails: any;
  displayName: string;

  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ReviewComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data) {
      this.data = data.rating;
    }
  }

  ngOnInit(): void {

    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.userDetails = userDetails;
    this.displayName = userDetails?.displayName;

    if (this.data) {
      this.form = this.fb.group({
        // username: [this.data.username, [Validators.required]],
        date: [this.data.date, [Validators.required]],
        rating: [Number(0)],
        title: [this.data.title, [Validators.required, Validators.maxLength(250)]],
        review: [this.data.review, [Validators.required, Validators.maxLength(500)]],
        approve: [Boolean(this.data.approve)]
      });
      this.updateRating(this.data.rate);
    }
    else {
      this.form = this.fb.group({
        // username: ['', [Validators.required]],
        date: [Date, [Validators.required]],
        rating: [Number(0)],
        title: ['', [Validators.required, Validators.maxLength(250)]],
        review: ['', [Validators.required, Validators.maxLength(500)]],
        approve: [Boolean(true)]
      });
    }
  }

  close(event: any) {
    this.dialogRef.close({
    });
  }

  updateRating(rate: number) {
    this.rating = rate;
  }

  save() {
    if (this.form.valid) {
      let rating: Rating = this.form.value as Rating;
      if (this.data)
        rating.id = this.data.id;
      rating.rate = this.rating;
      rating.approve = false;
      rating.username = this.displayName;
      this.dialogRef.close(rating);
    }
  }

}
