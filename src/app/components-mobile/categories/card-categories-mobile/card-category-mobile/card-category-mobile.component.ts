import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NewEvent } from "src/app/new-models/new-event";

@Component({
  selector: "app-card-category-mobile",
  templateUrl: "./card-category-mobile.component.html",
  styleUrls: ["./card-category-mobile.component.scss"],
})
export class CardCategoryMobileComponent implements OnInit {
  @Input() event: NewEvent;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  onClick() {
    this.router.navigate(["/cards/event/" + this.event.id]);
  }
}
